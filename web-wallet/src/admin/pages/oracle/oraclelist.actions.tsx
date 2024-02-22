import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DateInput, TopToolbar } from 'react-admin';
import axios from 'axios';
import { useRecordContext, Edit, Create, SimpleForm, TextInput, NumberInput, required } from 'react-admin';
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


export const OracleListActions = () => {
    const [openCreateOracle, setOpenCreateOracle] = React.useState(false); 

    const offsetCreate = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenCreateOracle(true);
    };

    return (
        <TopToolbar>
            <Button color="primary" onClick={ offsetCreate } >Create Oracle Offset Token Entry</Button>
            <BootstrapDialog open={openCreateOracle} onClose={() => setOpenCreateOracle(false)} aria-labelledby="customized-dialog-title">
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Add an Offset Token to Oracle</DialogTitle>
                <DialogContent dividers>
                    <Create>
                        <SimpleForm>
                            <TextInput source="symbol" />
                            <TextInput source="address" />
                            <NumberInput source="decimals"/>
                        </SimpleForm>
                    </Create>
                </DialogContent>
            </BootstrapDialog>   

        </TopToolbar>
    );

};