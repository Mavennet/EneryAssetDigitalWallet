# Energy-Asset-Digital-Wallet
This is a system to demonstrate the architecture for retiring CO2 emissions using offset tokens.

## contracts
The contracts folder contains the smart contracts to deploy.  For this demo, it is recomended to run them on the Sepolia test network.

## wallet-rest-api
This is a server application that handles persistent storage for the web interface

## web-wallet
This is the web interface for interacting with the smart contracts and the database

# Installation
The system should be able to run on an AWS t2-medium EC2 instance (or GCP/Azure equivalent).  Both the server and the web-wallet can be hosted on the same EC2 instance.  The server runs on port 3001 and the web app on 3000. An instance of MongoDB needs to be run on the server too.  The applications can be set to run "forever" using PM2 and the docker MongoDB can use the /b option to run in the background.


