# Emission Smart Contracts
There are two contracts for this project:\
EmissionToken.sol - Factory and NFT contracts\
MCO2Token.sol - Offset token contract

## Deploy the EmissionToken.sol
Save the contract address for this to add to the web wallet settings.\
This is the Factory pattern that is used to deplooy new Emission NFTs.

Any account can be used to deploy new NFTs with this contract.

## Deploy the MCO2Token.sol
This is a copy of the actual MCO2 offset token code.\
This is the token we will use for the demo.

Deployment instructions:\
You need to have two accounts with Sepolia.  One to deploy the token contract and one to be the owner.

The main contract interface is the ControlledToken contract.  You deploy using this and set the owner in the constructor.

Once this is deployed, make sure that you can mint to the owner account.

The contracts are designed to be deployed and tested from the Ethereum Remix interface (https://remix.ethereum.org/)



