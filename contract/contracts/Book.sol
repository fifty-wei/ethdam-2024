// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Book Contract
 * @author FiftyWei Team @ ETH Amsterdam
 */
contract Book is ERC721, AccessControl {
    using Counters for Counters.Counter;

    // =========================== Structs & Enum ==============================

    struct BookDetails {
        uint256 id;
        address owner;
        string name;
        string description;
        BookStatus status;
    }

    /**
     * @notice Enum BookStatus
     */
    enum BookStatus {
        Draft,
        InProgress,
        Published
    }

    // =========================== Mappings & Variables ==============================

    /**
     * @notice user address to Book struct
     */
    mapping(address => BookDetails[]) private ownerBooks;

    /**
     * @notice Book Id counter
     */
    Counters.Counter private nextBookId;

    /**
     * @notice Chapter registry
     */
    // IChapter public chapterIdContract;

    // =========================== Constructor ==============================

    constructor() ERC721("BookID", "BOO") {
        nextBookId.increment(); // we start the BookID at 1
    }

    // =========================== View functions ==============================

    function getBooks(address _owner) public view returns (BookDetails[] memory) {
        return ownerBooks[_owner];
    }

    // =========================== User functions ==============================

    // Create a new Book
    function createBook(string memory _name, string memory _description, BookStatus _status) public {
        uint256 bookId = nextBookId.current();

        BookDetails memory newBook = BookDetails({
            id: bookId,
            owner: msg.sender,
            name: _name,
            description: _description,
            status: _status
        });

        ownerBooks[msg.sender].push(newBook);

        nextBookId.increment();

        _mint(msg.sender, bookId);
    }

    // Change the Book Status
    function changeBookStatus(BookStatus _status, uint256 _idBook) public {
        // loop through the books of the owner
        for (uint256 i = 0; i < ownerBooks[msg.sender].length; i++) {
            if (ownerBooks[msg.sender][i].id == _idBook) {
                ownerBooks[msg.sender][i].status = _status;
                break;
            }
        }
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
