// in src/admin/index.tsx
import { Admin, Resource, ListGuesser } from "react-admin";
import Dashboard from "./pages/Dashboard";
import { WagmiConfig, createConfig, configureChains, mainnet, sepolia } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { publicProvider } from 'wagmi/providers/public'
import { WalletList } from  './pages/wallet/wallet.list'
import { WalletEdit } from  './pages/wallet/wallet.edit'
import { EmissionList } from  './pages/emissions/emission.list'
import { EmissionEdit } from  './pages/emissions/emission.edit'
import { RetireList } from  './pages/retire/retirelist'
import { OracleList } from  './pages/oracle/oracle.list'
import { OracleEdit } from  './pages/oracle/oracle.edit'
import { SettingsList } from  './pages/settings/settings.list'
import { SettingsEdit } from  './pages/settings/setting.edit'
import jsonServerProvider from "ra-data-json-server";
import { Co2TwoTone, WalletTwoTone, CloseFullscreenTwoTone, ChecklistRtlTwoTone, SettingsTwoTone } from '@mui/icons-material'


const dataProvider = jsonServerProvider("http://192.168.2.192:3001");

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [publicProvider()]
  )

const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
    ],
    publicClient,
    webSocketPublicClient,
})

function EmissionAdmin() {
    
    return (
    <WagmiConfig config={config}>
        <Admin dashboard={Dashboard} title="Mavennet Emission Offset" dataProvider={dataProvider} >
            <Resource
                options={{ label: 'Emission NFTs' }}
                icon={Co2TwoTone}
                name="emission"
                list={EmissionList}
                edit={EmissionEdit}
            />
            <Resource
                options={{ label: 'Offset Wallet' }}
                icon={WalletTwoTone}
                name="wallet"
                list={WalletList}
                edit={WalletEdit}
                recordRepresentation="symbol"
            />
            <Resource
                options={{ label: 'Retired Emissions' }}
                icon={CloseFullscreenTwoTone}
                name="retire"
                list={RetireList}
                edit={WalletEdit}
                recordRepresentation="symbol"
            />
            <Resource
                options={{ label: 'Offset Oracle' }}
                icon={ChecklistRtlTwoTone}
                name="oracle"
                list={OracleList}
                edit={OracleEdit}
                recordRepresentation="symbol"
            />
            <Resource
                options={{ label: 'System Settings' }}
                icon={SettingsTwoTone}
                name="settings"
                list={SettingsList}
                edit={SettingsEdit}
                recordRepresentation="symbol"
            />
        </Admin>
    </WagmiConfig>
  );
}


export default EmissionAdmin;