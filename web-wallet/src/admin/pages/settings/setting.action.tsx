import React from 'react';
import { useEffect } from "react";
import Button from '@mui/material/Button';
import { TopToolbar } from 'react-admin';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useAccount, useConnect } from 'wagmi'
import { useRecordContext } from 'react-admin';

export const PostShowActions = () => {
    const { connect, connectors, error, pendingConnector } = useConnect();

    const record = useRecordContext();
    console.log('record:' + JSON.stringify(record));  

    const mintABI = [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const { data, write } = useContractWrite({
        address: record.token,
        abi: mintABI,
        functionName: 'mint',
        args: [record.account, 10000],
    });

    const { isLoading, isSuccess } = useWaitForTransaction({ 
        hash: data?.hash,
        onSuccess(returnval) {
          console.log('Mint=', returnval)
        }
    });    

    const Metamask = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.target);
    };


    const Mint = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.target);
    };

    const Approve = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.target);
    };

    return (
        <TopToolbar>
            <div>
                {connectors.map((connector) => (
                    <Button color="primary" 
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                    >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    </Button>
                ))}
            </div>
            <Button color="primary" onClick={ () => write?.() }>Mint 10,000 MCO2</Button>
        </TopToolbar>
    );

};