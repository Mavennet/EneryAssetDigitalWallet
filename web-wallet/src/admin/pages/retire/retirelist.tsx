
import { Datagrid, DateField, List, ReferenceField, TextField, NumberField } from 'react-admin';

export const RetireList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="emission" />
            <TextField source="symbol" />
            <NumberField source="block" />
            <NumberField source="kgCO2" />
            <TextField source="id" />
        </Datagrid>
    </List>
);
