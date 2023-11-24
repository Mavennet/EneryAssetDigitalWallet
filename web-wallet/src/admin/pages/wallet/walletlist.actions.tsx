import React from 'react';
import Button from '@mui/material/Button';
import { useRecordContext, TopToolbar, useRefresh, SelectField } from 'react-admin';
import axios from 'axios';
import { useContractWrite, useWaitForTransaction, useContractEvent, useAccount, useConnect } from 'wagmi'
import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ConstructionOutlined } from '@mui/icons-material';
import { forEachChild } from 'typescript';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

export const WalletListActions = () => {
    const [createOpen, setCreateOpen] = React.useState(false); 
    const [nft, setNft] = React.useState(''); 
    const [nftName, setNftName] = React.useState(''); 
    const [nftAddress, setNftAddress] = React.useState(''); 
    const [symbol, setSymbol] = React.useState(''); 
    const [nftChoices, setNftChoices] = React.useState({ results: [] }); 
    const [offset, setOffset] = React.useState(''); 
    const [offsetChoices, setOffsetChoices] = React.useState({ results: [] }); 
    const [offsetAddress, setOffsetAddress] = React.useState(''); 


    const { address, isConnecting, isDisconnected } = useAccount();

    const approveABI = [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
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
    ]

    const transferABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
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
            "name": "transferFromToken",
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

    const { data: approveData, write: approveWrite } = useContractWrite({
        address: offsetAddress as `0x${string}`,
        abi: approveABI,
        functionName: 'approve',
        args: [nftAddress, 1000],
    });

    const { data: transferData, write: transferWrite } = useContractWrite({
        address: nftAddress as `0x${string}`,
        abi: transferABI,
        functionName: 'transferFromToken',
        args: [address, 1000, offsetAddress],
    });

    const { isLoading: approveLoading, isSuccess: approveSuccess } = useWaitForTransaction({ 
        hash: approveData?.hash,
        confirmations: 1,
        onSettled(returnval) {
            console.log('Approve=', returnval);
            refresh(); 
        }
    });  

    const { isLoading: transferLoading, isSuccess: transferSuccess } = useWaitForTransaction({ 
        hash: transferData?.hash,
        confirmations: 1,
        onSettled(returnval) {
            console.log('Transfer From=', returnval);
            let walletData = {
                symbol: symbol,
                address: offsetAddress,
                available: 1000,
                retired: 0,
                decimals: 9,
                emission: nftName,
                emissionaddress: nftAddress
            }
            console.log("Save wallet entry:", walletData);
            axios.post('http://192.168.2.192:3001/wallet/create', walletData)
                .then(response => {
                    refresh(); 
                    setCreateOpen(false);
                });
        }
    });

    const refresh = useRefresh();

    const Create = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setCreateOpen(true);
        await axios.get('http://192.168.2.192:3001/emission').then(response => {
            console.log("Emissions=", response);
            let nfts = response.data.map((nft: any) => {
                return {id: nft.address, name:nft.name}
            });
            console.log("nfts=", nfts);
            setNftChoices({results: nfts});
            console.log("nft choices=", nftChoices);
        });
        await axios.get('http://192.168.2.192:3001/oracle').then(response => {
            console.log("Offsets=", response);
            let offsets = response.data.map((offset: any) => {
                return {id: offset.address, name:offset.symbol}
            });
            console.log("offsets=", offsets);
            setOffsetChoices({results: offsets});
            console.log("offset choices=", offsetChoices);
        });

    };

    return (
        <TopToolbar>
            <Button color="primary" onClick={ Create }>Add to Wallet</Button>
            <BootstrapDialog open={createOpen} onClose={() => setCreateOpen(false)} aria-labelledby="customized-dialog-title">
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Approve Transfer 1000</DialogTitle>
                {(approveLoading || transferLoading) && (
                    <LinearProgress />
                )}
                {!approveLoading && transferLoading&& (
                    <br/>
                )}
                <DialogContent dividers>
                <Typography gutterBottom>
                    Select the Offset token to transfer &nbsp;
                    <Select
                        labelId="offset"
                        id="offset-filled"
                        value={offset}
                        onChange={(evOff) => {
                            setOffset(evOff.target.value as string);
                            console.log("onChange target=",evOff.target.value )
                            offsetChoices.results.map((offsetEntry: any) => {
                                console.log("entry=", offsetEntry);
                                if(offsetEntry.id===evOff.target.value) {
                                    setSymbol(offsetEntry.name);
                                    setOffsetAddress(offsetEntry.id);
                                };
                                return offsetEntry;
                            })
                            console.log("onChange name set to:", symbol);
                        }}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {offsetChoices.results.map((offsetEntry: any) => (
                            <MenuItem key={offsetEntry.id} value={offsetEntry?.id}>{offsetEntry?.name}</MenuItem>
                        ))}
                  </Select>
                </Typography>
                <Typography gutterBottom>
                    Select the NFT to transfer to &nbsp;
                    <Select
                        labelId="nft"
                        id="nft-filled"
                        value={nft}
                        onChange={(evNFT) => {
                            setNft(evNFT.target.value as string);
                            console.log("onChange target=",evNFT.target.value )
                            nftChoices.results.map((nftEntry: any) => {
                                console.log("entry=", nftEntry);
                                if(nftEntry.id===evNFT.target.value) {
                                    setNftName(nftEntry.name);
                                    setNftAddress(nftEntry.id);
                                };
                                return nftEntry;
                            })
                            console.log("onChange nft set to:", nft);
                        }}                            
                            
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {nftChoices.results.map((nftEntry: any) => (
                            <MenuItem key={nftEntry.id} value={nftEntry?.id}>{nftEntry?.name}</MenuItem>
                        ))}
                  </Select>
                </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={ () => approveWrite?.() } disabled={approveSuccess}>Approve</Button>
                    <Button color="primary" onClick={ () => transferWrite?.() } disabled={!approveSuccess}>TransferFrom</Button>
                </DialogActions>                
                <IconButton
                    aria-label="close"
                    onClick={() => setCreateOpen(false)}
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