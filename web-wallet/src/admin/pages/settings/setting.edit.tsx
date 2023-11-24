import { DateField, Edit, SimpleForm, TextInput, TextField, NumberField } from 'react-admin';
import { PostShowActions } from './setting.action';
import { SettingAside } from './setting.aside';

export const SettingsEdit = () => (
    <Edit aside={<SettingAside />} actions={<PostShowActions />}>
        <SimpleForm>
            <TextInput source="factory" />
            <TextInput source="account" />
            <TextInput source="token" />
            ID <TextField source="id" />
        </SimpleForm>
    </Edit>
);


