import { Chain } from '@wagmi/core'
 
export const sepolia = {
  id: 11155111,
  name: 'Sepolia',
  network: 'Canon',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia',
    symbol: 'SEP',
  },
  rpcUrls: {
    public: { http: ['https://rpc.sepolia.dev'] },
    default: { http: ['https://rpc.sepolia.org/'] },
  },
  blockExplorers: {
    etherscan: { name: 'Sepolia', url: 'https://sepolia.etherscan.io/' },
    default: { name: 'Sepolia', url: 'https://sepolia.etherscan.io/' },
  },
} as const satisfies Chain