import * as React from "react";
import {
    TabbedForm,
    Edit,
    Datagrid,
    TextField,
    DateField,
    TextInput,
    ReferenceManyField,
    NumberInput,    
    DateInput,
    BooleanInput,
    EditButton
} from 'react-admin';

const Dashboard = () => (
    <Edit>
        <TabbedForm>
            <TabbedForm.Tab label="MOSS Token">
                <TextInput disabled label="Id" source="id" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Emission Token">
                <TextInput disabled label="Id" source="id" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Blockchain">
            <TextInput disabled label="Id" source="id" />
            </TabbedForm.Tab>
        </TabbedForm>
    </Edit>
);

export default Dashboard;