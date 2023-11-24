# Emision Wallet 
This is the web front end to the Emission Wallet.

## Tech stack:
React.js - Display componets framework\
Wagmi - Web3 interface to Sepolia\
React-Admin - Display components for admin interface

In the src/admin/index.tsx file is the app component and the provider wrappers for Wagmi and React Admin.\
The database stroage is held in the wallet-rest-api server application.

This application is set to run on port 3000.

## Requirements:
This web appication assumes that you have a MetaMask browser plugin with an account that has Sepolia Eth.

You will also need to have deployed the MCO2Token.sol and EmissionToken.sol in Sepolia and save these addresses in your settings.

# Steps to run and demo
1. Put the factory contract and MCO2 contract addresses in the settings
2. Emissions interface - create emission NFT
3. Go into detail of new emission - initialize
4. Wallet interface - approve transfer 1000 to wallet from MCO2 token to emission NFT
5. Go into detail of new wallet - retire 500 
6. View changes to wallet and new entry in Retire interface

# Getting Started with Emission Wallet React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
