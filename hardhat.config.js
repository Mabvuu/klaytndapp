require("@nomiclabs/hardhat-ethers");
require("dotenv").config(); // Load .env file

module.exports = {
    solidity: "0.8.0",
    networks: {
        baobab: {
            url: "https://api.baobab.klaytn.net:8651/", // Klaytn Baobab testnet URL
            accounts: [`0x${process.env.PRIVATE_KEY}`] // Use the private key from .env
        },
    },
};


//MemeVoting deployed to: 0x3dD43454F500494CF8288a6897Bf4ABA2d8493dB
