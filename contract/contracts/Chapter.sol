// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Chapter Contract
 * @author FiftyWei Team @ ETH Amsterdam
 */
contract Chapter is ERC721, AccessControl {
    using Counters for Counters.Counter;

    // =========================== Structs & Enum ==============================

    struct ChapterDetails {
        uint256 id;
        address owner;
        string name;
        string publicContent;
        string privateContent;
        uint256 bookId;
    }

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
    function getChapters(uint256 _bookID) public view returns (ChapterDetails[] memory) {
        return bookChapters[_bookID];
    }

    // =========================== User functions ==============================

    // Create a new Chapter
    function createChapter(
        uint256 _bookId,
        string memory _name,
        string memory _publicContent,
        string memory _privateContent
    ) public {
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

    // =========================== Overrides ==============================

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
