# polygon-advance-1

This project involves generating a 5-item NFT collection using DALLE 2 or Midjourney, storing the items on IPFS, and deploying them as ERC721/1155 tokens on the sepolia Ethereum Testnet. It also includes transferring the NFTs from Ethereum to the Polygon amoy network using the FxPortal Bridge.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Step-by-Step Guide](#step-by-step-guide)
  - [1. Generate NFT Collection](#1-generate-nft-collection)
  - [2. Store NFTs on IPFS](#2-store-nfts-on-ipfs)
  - [3. Deploy Smart Contract](#3-deploy-smart-contract)
  - [4. Map NFTs on Polygon](#4-map-nfts-on-polygon)
  - [5. Mint NFTs](#5-mint-nfts)
  - [6. Transfer NFTs to Polygon](#6-transfer-nfts-to-polygon)
  - [7. Test Balance on Polygon](#7-test-balance-on-polygon)
- [License](#license)

## Project Overview

This project involves:
1. Generating 5 unique items using DALLE 2 or Midjourney.
2. Storing the generated items on IPFS using pinata.cloud.
3. Deploying an ERC721 (or ERC1155) contract on the sepolia Ethereum Testnet.
4. Mapping the NFT collection using Polygon network token mapper.
5. Writing Hardhat scripts for batch minting and transferring NFTs across chains using FxPortal Bridge.
6. Testing balance on the Polygon amoy network.

## Prerequisites

- Node.js and npm installed
- [Hardhat](https://hardhat.org/)
- Ethereum wallet (e.g., [MetaMask](https://metamask.io/)) with some sepolia ETH and MATIC
- [Pinata.cloud](https://pinata.cloud/) account for IPFS storage
- sepolia and amoy testnet setup on MetaMask
- [FxPortal Bridge](https://docs.polygon.technology/docs/develop/l1-l2-communication/fx-portal) knowledge
- [Polygon Token Mapper](https://mapper.polygon.technology/)

## Step-by-Step Guide

### 1. Generate NFT Collection

Generate 5 unique images using DALLE 2 or Midjourney. The prompt used for generating each image will be stored and returned by a `promptDescription()` function in the smart contract.

### 2. Store NFTs on IPFS

Store the generated images on IPFS via [Pinata.cloud](https://pinata.cloud/). Save the CID for each item, which will be used as metadata in your NFT smart contract.

### 3. Deploy Smart Contract

Deploy an ERC721 (or ERC1155) contract to the sepolia Ethereum Testnet. Ensure the contract includes the following:
- **promptDescription function:** This function returns the prompt used for each generated NFT. This can be implemented by storing prompts as a mapping in the contract.

Example contract snippet:
```solidity
mapping(uint256 => string) public prompts;

function promptDescription(uint256 tokenId) public view returns (string memory) {
    return prompts[tokenId];
}
```

### 4. Map NFTs on Polygon

To visualize the NFTs on Polygon, use the [Polygon Token Mapper](https://mapper.polygon.technology/) to map your ERC721 collection from sepolia to Polygon.

### 5. Mint NFTs

Write a Hardhat script to batch mint the NFTs on sepolia. Using **ERC721A** will be optimal for gas efficiency in minting multiple tokens.

Sample Hardhat script for minting:
```javascript
async function main() {
  const [owner] = await ethers.getSigners();
  const NFT = await ethers.getContractFactory("YourNFTContract");
  const nft = await NFT.deploy();

  await nft.deployed();
  console.log("NFT deployed to:", nft.address);

  // Batch mint 5 NFTs
  await nft.batchMint(owner.address, 5);
  console.log("Minted 5 NFTs");
}

main();
```

### 6. Transfer NFTs to Polygon

Write another Hardhat script to batch transfer all NFTs from sepolia to Polygon amoy using the FxPortal Bridge. The steps include:
- Approving NFTs for transfer.
- Depositing NFTs into the FxPortal Bridge.

Sample steps:
```javascript
// Approve NFTs for transfer
await nft.setApprovalForAll(FxPortal.address, true);

// Deposit NFTs
await FxPortal.deposit(nft.address, tokenId, userData);
```

### 7. Test Balance on Polygon

Once the NFTs are bridged to amoy, test the `balanceOf()` function to ensure they appear in the recipient's wallet.

```javascript
const balance = await nft.balanceOf(receiver.address);
console.log("Balance on Polygon amoy:", balance);
```

## License

This project is licensed under the MIT License.

---
