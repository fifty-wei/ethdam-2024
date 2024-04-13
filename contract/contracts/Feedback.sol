// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Feedback Contract
 * @author FiftyWei Team @ ETH Amsterdam
 */ contract Feedback is ERC721, AccessControl {
    using Counters for Counters.Counter;

    struct FeedbackDetails {
        uint256 id;
        uint256 ownerId;
        uint256 bookId;
        string description;
        uint256 rating;
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

    //mapping of all feedbacks by chapter id
    mapping(uint256 => FeedbackDetails[]) public feedbacks;

    // get feedback by id
    mapping(uint256 => FeedbackDetails) public feedbacksByID;

    /**
     * @notice Mapping to record whether the chapter has been reviewed by a user
     */
    mapping(uint256 => bool) public hasChapterBeenReviewed;

    // =========================== Constructor ==============================

    constructor() ERC721("FeedbackID", "FBI") {
        nextFeedbackId.increment(); // we start the BookID at 1
    }

    // =========================== View functions ==============================

    // Get all feedbacks for a chapter
    function getAllFeedbacks(uint256 _chapterId) public view returns (FeedbackDetails[] memory) {
        FeedbackDetails[] memory feedbacksList = new FeedbackDetails[](nextFeedbackId.current());
        for (uint256 i = 0; i < nextFeedbackId.current(); i++) {
            feedbacksList[i] = feedbacks[i];
        }
        return feedbacksList;
    }

    // =========================== User functions ==============================

    // Create a new feedback
    function createFeedback(uint256 _chapterId, string memory _description, uint256 _rating) public {
        uint256 feedbackId = nextFeedbackId.current();

        FeedbackDetails memory newFeedback = FeedbackDetails({
            id: feedbackId,
            ownerId: msg.sender,
            bookId: _chapterId,
            description: _description,
            rating: _rating
        });

        feedbacks[feedbackId] = newFeedback;

        nextFeedbackId.increment();
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
