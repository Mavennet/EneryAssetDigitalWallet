import { DateField, Show, SimpleShowLayout, TextField, NumberField } from 'react-admin';
import { WalletEditActions } from './walletedit.actions';

export const WalletEdit = () => (
    <Show actions={<WalletEditActions />}>
        <SimpleShowLayout>
            <NumberField source="available" />
            <NumberField source="retired" />
            <TextField source="emission" />
            <TextField source="emissionaddress" />
            <TextField source="symbol" />
            <TextField source="address" />
        </SimpleShowLayout>
    </Show>
);