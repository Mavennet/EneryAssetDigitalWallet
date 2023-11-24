
import { Datagrid, DateField, List, ReferenceField, TextField, NumberField } from 'react-admin';

export const SettingsList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="factory" />
            <TextField source="provider" />
            <TextField source="account" />
            <TextField source="id" />
            <TextField source="oracle" />
        </Datagrid>
    </List>
);