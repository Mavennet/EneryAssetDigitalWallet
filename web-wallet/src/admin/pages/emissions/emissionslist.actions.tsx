import React from 'react';
import Button from '@mui/material/Button';
import { TopToolbar, useRefresh } from 'react-admin';
import axios from 'axios';
import { useContractWrite, useWaitForTransaction, useContractEvent, useAccount, useConnect } from 'wagmi'
import { watchContractEvent } from '@wagmi/core'
import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

export const EmissionsListActions = () => {
    const [open, setOpen] = React.useState(false); 
    const [account, setAccount] = React.useState('');
    const [factory, setFactory] = React.useState('');
    const [emission, setEmission] = React.useState('');

    const factoryABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "createEmissionToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const eventABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "emissionTokenAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "EmissionTokenCreated",
            "type": "event"
        }
    ]

    const { data, write } = useContractWrite({
        address: factory as `0x${string}`,
        abi: factoryABI,
        functionName: 'createEmissionToken',
        args: [account],
    });

    const { isLoading, isSuccess } = useWaitForTransaction({ 
        hash: data?.hash,
        confirmations: 1,
        onSettled(returnval) {
            console.log('EmissionNFT=', returnval);
            let emmisionAddress = '0x'+returnval?.logs[0]?.data.slice(26, 66);
            setEmission(emmisionAddress!);
            let emissionData = {
                address: emmisionAddress,
                name: "new",
                block: Number(returnval?.blockNumber),
                kgCO2: 0,
                decimals: 0,
                retired_kgCO2: 0,
                emission_date: 0,
                emission_type: 0,
                emission_accuracy: 0
            }
            axios.post('http://192.168.2.192:3001/emission/create', emissionData)
                .then(response => {
                    refresh(); 
                    setOpen(false);
                });
        }
    });  

    const refresh = useRefresh();

    const Create = async (event: React.MouseEvent<HTMLButtonElement>) => {
        //console.log(event.target);
        setOpen(true);
        // Get setting account and factory
        await axios.get('http://192.168.2.192:3001/settings/getFirst').then(response => {
            console.log("Account=", response.data[0].account);
            setAccount(response.data[0].account)
            console.log("Factory=", response.data[0].factory)
            setFactory(response.data[0].factory)
        });
        // Call factory with account
        // Save new token in database call
        // close window
    };

    return (
        <TopToolbar>
            <Button color="primary" onClick={ Create }>Create Emission</Button>
            <BootstrapDialog open={open} onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title">
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Deploy new Emission Token</DialogTitle>
                {isLoading && (
                    <LinearProgress />
                )}
                {!isLoading && (
                    <br/>
                )}
                <DialogContent dividers>
                <Typography gutterBottom>
                    Owner account {account}
                </Typography>
                <Typography gutterBottom>
                    Factory contract {factory}
                </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={ () => write?.() }>Deploy</Button>
                </DialogActions>                
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </BootstrapDialog>   
        </TopToolbar>
    );
};