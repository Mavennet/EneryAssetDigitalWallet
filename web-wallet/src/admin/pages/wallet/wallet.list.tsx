import { Datagrid, DateField, List, ReferenceField, TextField, NumberField } from 'react-admin';
import { WalletListActions } from './walletlist.actions';

export const WalletList = () => (
    <List actions={<WalletListActions/>} empty={<WalletListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="emission" />
            <TextField source="symbol" />
            <NumberField source="available" />
            <NumberField source="retired" />
            <TextField source="address" />
            <NumberField source="decimals" />
            <TextField source="id" />
        </Datagrid>
    </List>
);