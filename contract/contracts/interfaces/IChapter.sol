// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";


/**
 * @title IChapter
 * @dev Interface for the Chapter contract functionalities
 */
abstract contract IChapter is ERC721, AccessControl {
    // =========================== Structs & Enum ==============================

    struct ChapterDetails {
        uint256 id;
        address owner;
        string name;
        string publicContent;
        string privateContent;
        uint256 bookId;
    }

    // =========================== View functions ==============================

    /**
     * @notice Get the Chapter ID of the book
     * @param _bookID The Book ID
     * @return ChapterDetails[] memory Returns an array of chapter details
     */
    function getChapters(uint256 _bookID) virtual external view returns (ChapterDetails[] memory);

    // =========================== User functions ==============================

    /**
     * @notice Create a new Chapter
     * @param _bookId The Book ID this chapter belongs to
     * @param _name Name of the chapter
     * @param _publicContent Content that is publicly accessible
     * @param _privateContent Content that is privately accessible
     */
    function createChapter(
        uint256 _bookId,
        string memory _name,
        string memory _publicContent,
        string memory _privateContent
    ) virtual external;

    // =========================== Overrides ==============================

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }

}
