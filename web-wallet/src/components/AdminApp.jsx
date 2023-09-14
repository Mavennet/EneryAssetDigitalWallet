"use client"; 
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import Dashboard from "./Dashboard";
import { WagmiConfig, createConfig } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { sepolia } from '../blockchain/sepolia-chain'

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: sepolia,
      transport: http()
    }),
})

const AdminApp = () => (
  <WagmiConfig config={config}>
    <Admin dashboard={Dashboard} title="Mavennet Emission Offset" dataProvider={dataProvider}>
      <Resource
        name="users"
        list={ListGuesser}
        edit={EditGuesser}
        recordRepresentation="name"
      />
    </Admin>
  </WagmiConfig>
);

export default AdminApp;