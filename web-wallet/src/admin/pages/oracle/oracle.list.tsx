
import { Datagrid, DateField, List, ReferenceField, TextField, NumberField } from 'react-admin';
import { OracleListActions } from './oraclelist.actions';

export const OracleList = () => (
    <List empty={<OracleListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="symbol" />
            <TextField source="address" />
            <NumberField source="decimals" />
            <TextField source="id" />
        </Datagrid>
    </List>
);