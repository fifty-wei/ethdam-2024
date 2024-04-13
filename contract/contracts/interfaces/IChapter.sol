// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title IChapter
 * @dev Interface for the Chapter contract functionalities
 */
interface IChapter {
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
    function getChapters(uint256 _bookID) external view returns (ChapterDetails[] memory);

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
    ) external;

    function ownerOf(uint256 tokenId) external view returns (address);

    function isValid(uint256 _hackathonId) external view;

    function supportsInterface(bytes4 interfaceId) external view returns (bool);

    function transferFrom(address from, address to, uint256 tokenId) external;

    function safeTransferFrom(address from, address to, uint256 tokenId) external;

    function tokenURI(uint256 tokenId) external view returns (string memory);
}
