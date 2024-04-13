// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {IChapter} from "./interfaces/IChapter.sol";
import {EIP155Signer} from "@oasisprotocol/sapphire-contracts/contracts/EIP155Signer.sol";

import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";
import '@oasisprotocol/sapphire-contracts/contracts/EthereumUtils.sol';

/**
 * @title Feedback Contract
 * @author FiftyWei Team @ ETH Amsterdam
 */ 
contract Feedback is ERC721, AccessControl {

    enum FeedbackStatus {
        Waiting,
        Accepted,
        Rejected
    }

    enum WaitingListStatus {
        Pending,
        Accepted,
        Rejected
    }
    
    using Counters for Counters.Counter;

    struct FeedbackDetails {
        uint256 id;
        address owner;
        uint256 chapterId;
        string content;
        uint256 rating;
        FeedbackStatus status;
    }

    struct WaitingListDetails {
        uint256 id;
        address owner;
        uint256 chapterId;
        WaitingListStatus status;
    }

    /**
     * @notice Review id counter
     */
    Counters.Counter nextFeedbackId;

    Counters.Counter nextWaitingListId;

    // get the feedback by id
    mapping(uint256 => FeedbackDetails) public feedbacks;

    // mapping of all feedbacks by chapter id
    mapping(uint256 => uint256[]) public chapterFeedbacks;

    // Mapping chapter ID to waiting list
    mapping(uint256 => WaitingListDetails) public waitingList;

    //mapping of all waiting lists by chapter id
    mapping(uint256 => uint256[]) public chapterWaitingLists;

    IChapter public chapterIdContract;

    // =========================== Constructor ==============================

    address private pubkey;
    bytes32 private secret;
    uint64 private nonce;
    

    constructor(address _chapterContractAddress) ERC721("FeedbackID", "FBI") {
        chapterIdContract = IChapter(_chapterContractAddress);
        nextFeedbackId.increment(); // we start the feedbackId at 1
        nextWaitingListId.increment(); // we start the waitingListId at 1

        // Generate a pub/private key for the contract
        (pubkey, secret) = EthereumUtils.generateKeypair();
        nonce = 150;
    }

    
    /// Create Gas less transaction
    /// Free Tx to incicate people giving feedback without paying
    function proxyCreateFeedback(
        uint256 _chapterId, 
        string memory _content, 
        uint256 _rating
    ) external view returns (bytes memory output) {

        // Construct target proxy contract call
        bytes memory innercall = abi.encodeWithSignature(
            "createFeedback(uint256,string,uint256)", 
            _chapterId, 
            _content, 
            _rating
        );

        // Build the target executed contract call with the inner one
        bytes memory data = abi.encode(address(this), innercall);

        // Call will invoke proxy().
        return EIP155Signer.sign(pubkey, secret, EIP155Signer.EthTx({
            nonce: nonce,
            gasPrice: 100_000_000,
            gasLimit: 250000,
            to: address(this),
            value: 0,
            data: abi.encodeCall(this.proxy, data),
            chainId: block.chainid
            })
        );
    }

    /// Execute gas less transaction
    /// At the moment only create feedback is gas less
    function proxy(bytes memory data) external payable {
        (address addr, bytes memory subcallData) = abi.decode(
            data,
            (address, bytes)
        );
        (bool success, bytes memory outData) = addr.call{value: msg.value}(
            subcallData
        );
        
        if (!success) {
            // Add inner-transaction meaningful data in case of error.
            assembly {
                revert(add(outData, 32), mload(outData))
            }
        }
        nonce += 1;
    }

    // =========================== View functions ==============================

    // Get all feedbacks for a chapter
    function getAllFeedbacks(uint256 _chapterId) public view returns (FeedbackDetails[] memory) {
        FeedbackDetails[] memory result = new FeedbackDetails[](chapterFeedbacks[_chapterId].length);
        for (uint256 i = 0; i < chapterFeedbacks[_chapterId].length; i++) {
            result[i] = feedbacks[chapterFeedbacks[_chapterId][i]];
        }
        return result;
    }

    function getAllWaitingList(uint256 _chapterId) public view returns (WaitingListDetails[] memory) {
        WaitingListDetails[] memory result = new WaitingListDetails[](chapterWaitingLists[_chapterId].length);
        for (uint256 i = 0; i < chapterWaitingLists[_chapterId].length; i++) {
            result[i] = waitingList[chapterWaitingLists[_chapterId][i]];
        }
        return result;
    }

    // check if a user is whitelisted for a specific chapter
    function isWhitelistedUser(address _user, uint256 _chapterId) public view returns (bool) {
        for (uint256 i = 0; i < chapterWaitingLists[_chapterId].length; i++) {
            WaitingListDetails memory waitingListData = waitingList[chapterWaitingLists[_chapterId][i]];
            if (waitingListData.owner == _user) {
                return waitingListData.status == WaitingListStatus.Accepted;
            }
        }
        return false;
    }

    // isWhitelisted public with chapterId
    function isWhitelisted(uint256 _chapterId) public view returns (bool) {
        return isWhitelistedUser(msg.sender, _chapterId);
    }

    // Apply to whitlelist function
    function applyToWhitelist(uint256 _chapterId) public {
        uint256 waitingListId = nextWaitingListId.current();

        WaitingListDetails memory newWaitingList = WaitingListDetails({
            id: waitingListId,
            owner: msg.sender,
            chapterId: _chapterId,
            status: WaitingListStatus.Pending
        });

        waitingList[waitingListId] = newWaitingList;
        chapterWaitingLists[_chapterId].push(waitingListId);

        nextWaitingListId.increment();
    }

    // =========================== User functions ==============================

    // Create a new feedback
    function createFeedback(uint256 _chapterId, string memory _content, uint256 _rating) public {
        uint256 feedbackId = nextFeedbackId.current();

        // we check if the user is whitelisted
        require(isWhitelisted(_chapterId), "You are not whitelisted for this chapter");

        FeedbackDetails memory newFeedback = FeedbackDetails({
            id: feedbackId,
            owner: msg.sender,
            chapterId: _chapterId,
            content: _content,
            rating: _rating,
            status: FeedbackStatus.Waiting
        });

        feedbacks[feedbackId] = newFeedback;
        chapterFeedbacks[_chapterId].push(feedbackId);

        nextFeedbackId.increment();
    }

    // EIP155Signer



    // Accept a feedback
    function acceptFeedback(uint256 _feedbackId) public {
        changeFeedbackStatus(_feedbackId, FeedbackStatus.Accepted);
    }

    // Reject a feedback
    function rejectFeedback(uint256 _feedbackId) public {
        changeFeedbackStatus(_feedbackId, FeedbackStatus.Rejected);
    }

    function changeFeedbackStatus(uint256 _feedbackId, FeedbackStatus _status) public {
        FeedbackDetails storage feedback = feedbacks[_feedbackId];
        require(chapterIdContract.ownerOf(feedback.chapterId) == msg.sender, "Not the owner of the chapter");

        feedback.status = _status;
    }

    // Create a function for the chapter owner to whitelist a user
    function changeWhiteListStatus(uint256 _waitingListId, WaitingListStatus _status) public {
        WaitingListDetails storage waitingListData = waitingList[_waitingListId];
        require(chapterIdContract.ownerOf(waitingListData.chapterId) == msg.sender, "Not the owner of the chapter");

        waitingListData.status = _status;
    }

    // =========================== Overrides ===================================

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }

    function transferFrom(address, address, uint256) public virtual override(ERC721) {
        revert("Not allowed");
    }

    function safeTransferFrom(address, address, uint256) public virtual override(ERC721) {
        revert("Not allowed");
    }
}
