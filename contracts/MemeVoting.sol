// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MemeVoting {
    struct Meme {
        string memeUrl;  
        uint voteCount;  // Number of votes the meme has received
    }

    Meme[] public memes;
    mapping(address => bool) public hasVoted;

    // Submit a new meme
    function submitMeme(string memory _memeUrl) public {
        memes.push(Meme(_memeUrl, 0));
    }

    // Vote for a meme
    function vote(uint _memeIndex) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(_memeIndex < memes.length, "Invalid meme index.");

        memes[_memeIndex].voteCount += 1;
        hasVoted[msg.sender] = true; // Mark voter as having voted
    }

    // Get meme data
    function getMeme(uint _index) public view returns (string memory, uint) {
        require(_index < memes.length, "Meme does not exist.");
        return (memes[_index].memeUrl, memes[_index].voteCount);
    }

    // Get the total number of memes
    function getMemeCount() public view returns (uint) {
        return memes.length;
    }
}
