import { DateField, Show, SimpleShowLayout, TextField, NumberField, useRecordContext } from 'react-admin';
import { PostShowActions } from './emission.actions';
import { SettingAside } from '../settings/setting.aside';
import Typography from '@mui/material/Typography';


const Aside = () => {
    return (
        <div style={{ width: 300, margin: '1em' }}>
            <Typography variant="h6"></Typography>
        </div>
    );
};


export const EmissionEdit = () => (
    <Show aside={<Aside />}  actions={<PostShowActions />} >
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="address" />
            <NumberField source="block" textAlign='right'/>
            <NumberField source="kgCO2" />
            <NumberField source="decimals" />
            <NumberField source="retired_kgCO2" />
            <DateField source="emission_date" />
            <NumberField source="emission_type" />
            <NumberField source="emission_accuracy" />
            <TextField source="id" />
        </SimpleShowLayout>
    </Show>
);