
import { Datagrid, DateField, List, ReferenceField, TextField, NumberField } from 'react-admin';
import { EmissionsListActions } from './emissionslist.actions';

export const EmissionList = () => (
    <List actions={<EmissionsListActions/>} empty={<EmissionsListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            {/*<TextField source="address" /> */}
            <DateField source="emission_date" />
            <NumberField source="block" />
            <NumberField source="kgCO2" />
            <NumberField source="decimals" />
            <NumberField source="retired_kgCO2" />
            <NumberField source="emission_type" />
            <NumberField source="emission_accuracy" />
            <TextField source="id" />
        </Datagrid>
    </List>
);