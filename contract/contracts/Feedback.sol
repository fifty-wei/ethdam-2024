// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {IChapter} from "./interfaces/IChapter.sol";

/**
 * @title Feedback Contract
 * @author FiftyWei Team @ ETH Amsterdam
 */ contract Feedback is ERC721, AccessControl {
    using Counters for Counters.Counter;

    struct FeedbackDetails {
        uint256 id;
        address owner;
        uint256 chapterId;
        string content;
        uint256 rating;
        FeedbackStatus status;
    }

    enum FeedbackStatus {
        Waiting,
        Accepted,
        Rejected
    }

    /**
     * @notice Review id counter
     */
    Counters.Counter nextFeedbackId;

    // get the feedback by id
    mapping(uint256 => FeedbackDetails) private feedbacks;

    // mapping of all feedbacks by chapter id
    mapping(uint256 => uint256[]) public chapterFeedbacks;

    IChapter public chapterIdContract;

    // =========================== Constructor ==============================

    constructor(address _chapterContractAddress) ERC721("FeedbackID", "FBI") {
        chapterIdContract = IChapter(_chapterContractAddress);
        nextFeedbackId.increment(); // we start the feedbackId at 1
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

    // =========================== User functions ==============================

    // Create a new feedback
    function createFeedback(uint256 _chapterId, string memory _content, uint256 _rating) public {
        uint256 feedbackId = nextFeedbackId.current();

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

    // Accept a feedback
    function acceptFeedback(uint256 _feedbackId) public {
        changeFeedbackStatus(_feedbackId, FeedbackStatus.Accepted);
    }

    // Accept a feedback
    function rejectFeedback(uint256 _feedbackId) public {
        changeFeedbackStatus(_feedbackId, FeedbackStatus.Rejected);
    }

    function changeFeedbackStatus(uint256 _feedbackId, FeedbackStatus _status) public {
        FeedbackDetails storage feedback = feedbacks[_feedbackId];
        require(chapterIdContract.ownerOf(feedback.chapterId) == msg.sender, "Not the owner of the chapter");

        feedback.status = _status;
    }

    // =========================== Overrides ===================================

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override(ERC721) {
        revert("Not allowed");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override(ERC721) {
        revert("Not allowed");
    }
}
