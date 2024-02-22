import React from 'react';
import Button from '@mui/material/Button';
import { useRecordContext, TopToolbar, useRefresh } from 'react-admin';
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

export const WalletEditActions = () => {
    const [retireOpen, setRetireOpen] = React.useState(false); 

    const Retire = (event: React.MouseEvent<HTMLButtonElement>) => {
        setRetireOpen(true);
    };

    const { address, isConnecting, isDisconnected } = useAccount();
    const record = useRecordContext();

    const retireABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "greenToken",
                    "type": "address"
                }
            ],
            "name": "retireToken",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }        
    ]

    const { data: retireData, write: retireWrite } = useContractWrite({
        address: record.emissionaddress,
        abi: retireABI,
        functionName: 'retireToken',
        args: [500, record.address],
    });

    const { isLoading: retireLoading, isSuccess: retireSuccess } = useWaitForTransaction({ 
        hash: retireData?.hash,
        confirmations: 1,
        onSettled(returnval) {
            console.log('Retire=', returnval);
            let walletData = {
                address: record.address,
                emissionaddress: record.emissionaddress,
                available: record.available - 500,
                retired: record.retired + 500,
            }
            console.log('Updated wallet=', walletData);
            axios.post('http://192.168.2.192:3001/wallet/retire', walletData)
                .then(response => {
                    console.log("Update wallet:", response);
                });
        
            let retirementData = {
                emission: record.emission,
                emissionaddress: record.emissionaddress,
                symbol: record.symbol,
                offsetaddress: record.address,
                block: Number(returnval?.blockNumber),
                kgCO2: 500,
                decimals: 9
            }
            console.log('Create retire=', retirementData);
            axios.post('http://192.168.2.192:3001/retire/create', retirementData)
                .then(response => {
                    console.log("Create retire:", response);
                    refresh(); 
                    setRetireOpen(false);
                });
        }
    });

    const refresh = useRefresh();

    return (
        <TopToolbar>
            <Button color="primary" onClick={ Retire }>Retire 500 Emissions With Token</Button>
            <BootstrapDialog open={retireOpen} onClose={() => setRetireOpen(false)} aria-labelledby="customized-dialog-title">
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Retire Emissions With Token</DialogTitle>
                {retireLoading && (
                    <LinearProgress />
                )}
                <DialogContent dividers>
                <Typography gutterBottom>
                    Retire 500Kg CO2 from {record.emission} using Token {record.symbol} <br/>
                </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={ () => retireWrite?.() }>Retire</Button>
                </DialogActions>                
                <IconButton
                    aria-label="close"
                    onClick={() => setRetireOpen(false)}
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