import { DateField, Edit, SimpleForm, TextInput, TextField, NumberInput } from 'react-admin';

export const OracleEdit = () => (
    <Edit >
        <SimpleForm>
            <TextInput source="symbol" />
            <TextInput source="address" />
            <NumberInput source="decimals"/>
        </SimpleForm>
    </Edit>
);


