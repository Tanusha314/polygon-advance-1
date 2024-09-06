const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/contract1.sol/contract1.json");

const tokenAddress = "0x62Bf848b75919BCf8460A4eA57CB78DB91a0A59F"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x0D53f8320766e9384846Da681dbd51db9D1Ef228";

async function main() {
  try {
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const balance = await token.balanceOf(walletAddress);
    console.log(`You now have: ${balance} NFTs in your wallet`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();
