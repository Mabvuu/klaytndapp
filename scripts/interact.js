const hre = require("hardhat");

async function main() {
    const contractAddress = "0x3dD43454F500494CF8288a6897Bf4ABA2d8493dB"; // Your deployed contract address
    const MemeVoting = await hre.ethers.getContractFactory("MemeVoting");
    const memeVoting = MemeVoting.attach(contractAddress);

    // Example usage
    const memeUrls = [
        "https://example.com/meme1.jpg",
        "https://example.com/meme2.jpg",
    ];

    // 1. Submit new memes
    for (const url of memeUrls) {
        try {
            const submitTx = await memeVoting.submitMeme(url);
            await submitTx.wait(); // Wait for the transaction to be mined
            console.log(`Submitted meme: ${url}`);
        } catch (error) {
            console.error("Error submitting meme:", error);
        }
    }

    // 2. Vote for the first meme
    try {
        const voteTx = await memeVoting.vote(0); // Vote for meme at index 0
        await voteTx.wait(); // Wait for the transaction to be mined
        console.log(`Voted for meme at index 0`);
    } catch (error) {
        console.error("Error voting for meme:", error);
    }

    // 3. Get meme data
    try {
        const [url, votes] = await memeVoting.getMeme(0);
        console.log(`Meme at index 0 - URL: ${url}, Votes: ${votes}`);
    } catch (error) {
        console.error("Error retrieving meme data:", error);
    }

    // 4. Get total number of memes
    try {
        const memeCount = await memeVoting.getMemeCount();
        console.log(`Total number of memes: ${memeCount}`);
    } catch (error) {
        console.error("Error retrieving meme count:", error);
    }

    // 5. Attempt to vote for the second meme (new user or reset voting)
    // This part should be done using a different wallet to avoid the "already voted" issue
    try {
        // Change the signer to a new address if you have another private key
        const newSigner = hre.ethers.provider.getSigner(1); // Assuming the second account is unlocked
        const memeVotingWithNewSigner = memeVoting.connect(newSigner);
        
        const voteTx = await memeVotingWithNewSigner.vote(1); // Vote for meme at index 1
        await voteTx.wait(); // Wait for the transaction to be mined
        console.log(`Voted for meme at index 1`);
    } catch (error) {
        console.error("Error voting for meme:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
