import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DateInput, TopToolbar } from 'react-admin';
import axios from 'axios';
import { useRecordContext, Edit, SimpleForm, TextInput, NumberInput, required } from 'react-admin';
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

const factoryABI = [
    {
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_emission_kgCO2",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_emission_decimals",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_emission_date",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_emission_type",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_emission_accuracy",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setEmission",
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
];

export const PostShowActions = () => {
    const [openInit, setOpenInit] = React.useState(false); 
    const [token, setToken] = React.useState('');
    const [emmission, setEmission] = React.useState({_emission_kgCO2: 0 , _emission_decimals: 0, _emission_date: 0, _emission_type: 0, _emission_accuracy:0, _name: "new" }); 

    const record = useRecordContext();

    const Initialize = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenInit(true);
    };

    const transform = async (data: any) => {
        const sanitizedData = {};
        await getToken();
        // Convert date to Unix timestamp
        console.log("Date is of type:",typeof data.emission_date);
        const strdate=data.emission_date.slice(0,10);
        console.log("Date is now:",strdate);
        const eDate: Date = new Date(strdate);
        const linuxDate = eDate.getTime()/1000;
        console.log("Linux Date is:",linuxDate);
        // Save to blockchain
        setEmission({_emission_kgCO2: data.kgCO2 , _emission_decimals: data.decimals, _emission_date: linuxDate, _emission_type: data.emission_type, _emission_accuracy: data.emission_accuracy, _name: data.name });
        return data;
    };

    const getToken = async () => {
        // Get this token
        const tokenData = await axios.get('http://192.168.2.192:3001/emission/'+record.id).then(response => {
            setToken(response.data.address);
        });
    };   

    useEffect(() => {
        // Wait until token is updated
        console.log("Emission data=",emmission);
        console.log("Token data=",token);
        write();
    }, [token]);


    const { data, write } = useContractWrite({
        address: token as `0x${string}`,
        abi: factoryABI,
        functionName: 'setEmission',
        args: [emmission._emission_kgCO2, emmission._emission_decimals, emmission._emission_date, emmission._emission_type, emmission._emission_accuracy, emmission._name],
    });

    return (
        <TopToolbar>
            <Button color="primary" onClick={ Initialize } disabled={record.kgCO2}>Initialize</Button>
            <BootstrapDialog open={openInit} onClose={() => setOpenInit(false)} aria-labelledby="customized-dialog-title">
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Initialize Emission Token</DialogTitle>
                <DialogContent dividers>
                    <Edit transform={transform}>
                        <SimpleForm>
                            <TextInput source="name" />
                            <NumberInput source="kgCO2" />
                            <NumberInput source="decimals"/>
                            <DateInput source="emission_date" />
                            <NumberInput source="emission_type"/>
                            <NumberInput source="emission_accuracy"/>
                        </SimpleForm>
                    </Edit>
                </DialogContent>
            </BootstrapDialog>   

        </TopToolbar>
    );
};