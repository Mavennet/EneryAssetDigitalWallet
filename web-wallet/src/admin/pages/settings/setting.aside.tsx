import { Box, Typography } from '@material-ui/core';
import { useRecordContext } from 'react-admin';
import { useBalance, useAccount, useConnect, useDisconnect} from 'wagmi';
import Button from '@mui/material/Button';

export const SettingAside = () => {
    const { address, connector, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const record = useRecordContext();
    console.log('record:' + JSON.stringify(record));   

    const { data, isError, isLoading } = useBalance({
        address: record.account,
        token: record.token,
        //watch: true,
        formatUnits: 18,
        onSuccess(data) {
            console.log('Success', data)
        },
        onError(error) {
            console.log('Connector', connector)
        },
    })

    console.log("BalanceOf=", data);

    if (isLoading) { 
        return (
            <div>Fetching balance…</div>
        )
    }
    else if (isError) {
        return (
            <div>Error fetching balance connector=</div>
        )
    }
    else if (isConnected) {
        return (
            <div style={{ width: 200, margin: '2em 1em' }}>
                <Typography variant="h5">MCO2 Wallet</Typography>
                <Typography variant="body2">
                    Connected
                </Typography>
                <Typography variant="body2">
                    BalanceOf= { data?.value.toString() }
                </Typography>
            </div>
        )
    }
    else {
        return (
            <Box sx={{ width: '300px', margin: '10px' }}>
            <Typography variant="h4">MCO2 Wallet</Typography>
            <Typography variant="body2">
                Disonnected
            </Typography>
            </Box>
        )
    }

}