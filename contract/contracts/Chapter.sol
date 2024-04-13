// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IChapter} from "./interfaces/IChapter.sol";

/**
 * @title Chapter Contract
 * @author FiftyWei Team @ ETH Amsterdam
 */
contract Chapter is IChapter {
    using Counters for Counters.Counter;

    // =========================== Mappings & Variables ==============================

    /**
     * @notice user address to Chapter struct
     */
    mapping(uint256 => ChapterDetails[]) private bookChapters;

    /**
     * @notice Chapter Id counter
     */
    Counters.Counter private nextChapterId;

    /**
     * @notice Chapter registry
     */

    // =========================== Constructor ==============================

    constructor() ERC721("ChapterID", "CHA") {
        nextChapterId.increment(); // we start the BookID at 1
    }

    // =========================== View functions ==============================

    /**
     * @notice Get the Chapter ID of the book
     * @param _bookID The Book ID
     */
    function getChapters(uint256 _bookID) override public view returns (ChapterDetails[] memory) {
        return bookChapters[_bookID];
    }

    // =========================== User functions ==============================

    // Create a new Chapter
    function createChapter(
        uint256 _bookId,
        string memory _name,
        string memory _publicContent,
        string memory _privateContent
    ) override public {
        uint256 chapterId = nextChapterId.current();
        ChapterDetails memory newChapter = ChapterDetails(
            chapterId,
            msg.sender,
            _name,
            _publicContent,
            _privateContent,
            _bookId
        );

        nextChapterId.increment();
        bookChapters[_bookId].push(newChapter);
        _mint(msg.sender, chapterId);
    }

    // function to edit the chapter
    function editChapter(
        uint256 _chapterId,
        string memory _name,
        string memory _publicContent,
        string memory _privateContent
    ) public {
        require(ownerOf(_chapterId) == msg.sender, "Chapter: Not the owner");

        ChapterDetails[] storage chapters = bookChapters[_chapterId];
        for (uint256 i = 0; i < chapters.length; i++) {
            if (chapters[i].id == _chapterId) {
                chapters[i].name = _name;
                chapters[i].publicContent = _publicContent;
                chapters[i].privateContent = _privateContent;
            }
        }
    }

    function transferFrom(address, address, uint256) public virtual override(ERC721) {
        revert("Not allowed");
    }

    function safeTransferFrom(address, address, uint256) public virtual override(ERC721) {
        revert("Not allowed");
    }
}
