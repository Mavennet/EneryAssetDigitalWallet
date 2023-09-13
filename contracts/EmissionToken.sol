// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// TBD Based on ERC-165, ERC-721, ERC-5192
contract EmissionToken {

    address public retire_oracle;
    address public owner;

    // Emissions will be represented as kgCO2 * 10^decimals so that we can divide and multiply based on conversion factor
    struct Emission {
        uint emission_kgCO2;
        uint emission_decimals;
        uint retired_kgCO2;
        uint emission_date;
        uint emission_type;
        uint emission_accuracy;
    }
    Emission public emission;

    struct OffsetToken {
        uint available;
        uint retired;
    }

    // Map the tokens to the balances
    mapping(address greenToken => OffsetToken) public wallet;

    // Conversion will be represented as conversion * 10^9 so that we can divide and multiply based on difference in units
    struct Retired {
        address greenToken;
        uint amount;
        uint conversion;
    }

    // Map the transaction date/time to the retirement
    mapping(uint dateTime => Retired) public retirements;

    // make sure only the owner can run functions with this modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Notify that an amount of one of the green tokens has been transferred out
    event TransferToken(address indexed emissionToken, address indexed to, uint amount, address indexed greenToken);
    // Notify that an amount of a green token has been transferred in
    event TransferFromToken(address indexed emissionToken, address indexed from, uint amount, address indexed greenToken);
    // Notify that a retire action has taken place
    event RetireToken(address indexed emissionToken, uint amount, address indexed greenToken);

    constructor(address _owner) {
        // Set the token owner 
        owner = _owner;
        // Set the starting emissions to 0
        emission.emission_kgCO2 = 0; 
        // Set the retired emissions to 0
        emission.retired_kgCO2 = 0;
    }

    // Record the emission amount - one time only for non-zero kgCO2
    function setEmission(uint _emission_kgCO2, uint _emission_decimals, uint _emission_date, uint _emission_type, uint _emission_accuracy) public onlyOwner returns (bool) {
        // Only allow this once
        require(emission.emission_kgCO2 == 0, "Emission data has already been set");
        // Do not allow an emission kgO2 value of 0
        require(_emission_kgCO2 > 0, "Emission datacannot have 0 kgCO2");
        // Save the data in the emission record
        emission = Emission({emission_kgCO2: _emission_kgCO2, emission_decimals: _emission_decimals, retired_kgCO2: 0, emission_date: _emission_date, emission_type: _emission_type, emission_accuracy: _emission_accuracy});

        return true;
    }

    // balanceOfToken that supports checking the balance of a specific token by token contract address
    function balanceOfToken(address greenToken) external view returns (uint) {
        return wallet[greenToken].available;
    }

    // Transfer an amount of an offset token into the wallet 
    function transferFromToken(address from, uint amount, address greenToken) public onlyOwner returns (bool) {
        IERC20 _greenToken = IERC20(greenToken);
        // Check to see if the transfer allowance has been set on the token
        require(_greenToken.allowance(from, address(this)) >= amount, "The green token transferFrom allowance has not been set that high");
        if(_greenToken.transferFrom(from, address(this), amount)==true) {
            wallet[greenToken].available += amount;
            emit TransferFromToken(address(this), from, amount, greenToken);
            return true;
        }
        return false;
    }
    
    // Transfer out of the wallet an amount of a token that is not retired
    function transferToken(address to, uint amount, address greenToken) public onlyOwner returns (bool) {
        IERC20 _greenToken = IERC20(greenToken);
        // Check balance of this token held by this contract - also checks to see if ERC20 compatible
        require(amount <= _greenToken.balanceOf(address(this)), "Insufficient token balance held");
        // Check available amount of this token in this contract for transfer - not retired
        require(amount <= wallet[greenToken].available, "Insufficient token balance available to retire");
        // Tell the token contract to transfer the amount from this contract 
        if(_greenToken.transfer(to, amount)==true) {
            // Reduce the available by transfer amount 
            wallet[greenToken].available -= amount;
            emit TransferToken(address(this), to, amount, greenToken);   
            return true;
        }
        return false;
    }

    // Retire a token by locking it in so that it cannot be transferred out of the wallet
    function retireToken(uint amount, address greenToken) public onlyOwner returns (bool) {
        // Check to see if there is enough to retire
        require(amount <= wallet[greenToken].available, "Insufficient token balance available to retire");
        // Make sure we have enough emissions to retire
        require(amount <= emission.emission_kgCO2 - emission.retired_kgCO2, "Not enough emissions to retire");
        // Reduce the available tokens
        wallet[greenToken].available -= amount;
        // Increase the retired tokens
        wallet[greenToken].retired += amount;
        // Record the retirement
        Retired memory _retired = Retired({amount:amount, greenToken: greenToken, conversion: 1 }); 
        // Increase the emission retired kgCO2
        emission.retired_kgCO2 += amount;
        // For now use a 1-for-1 conversion.  The conversion comes from the oracle
        retirements[block.timestamp] = _retired;

        emit RetireToken(address(this), amount, greenToken);
        return true;
    }

}