import { sepolia, mainnet, base, baseSepolia, optimism, arbitrum, polygon } from 'viem/chains';

export const SUPPORTED_CHAINS = {
  mainnet,
  sepolia,
  base,
  baseSepolia,
  optimism,
  arbitrum,
  polygon,
} as const;

export type SupportedChainId = (typeof SUPPORTED_CHAINS)[keyof typeof SUPPORTED_CHAINS]['id'];

export const DEFAULT_RPC_URLS: Record<number, string> = {
  [mainnet.id]: 'https://eth.public-rpc.com',
  [sepolia.id]: 'https://rpc.sepolia.org',
  [base.id]: 'https://mainnet.base.org',
  [baseSepolia.id]: 'https://sepolia.base.org',
  [optimism.id]: 'https://mainnet.optimism.io',
  [arbitrum.id]: 'https://arb1.arbitrum.io/rpc',
  [polygon.id]: 'https://polygon-rpc.com',
};

export const BLOCK_EXPLORERS: Record<number, string> = {
  [mainnet.id]: 'https://etherscan.io',
  [sepolia.id]: 'https://sepolia.etherscan.io',
  [base.id]: 'https://basescan.org',
  [baseSepolia.id]: 'https://sepolia.basescan.org',
  [optimism.id]: 'https://optimistic.etherscan.io',
  [arbitrum.id]: 'https://arbiscan.io',
  [polygon.id]: 'https://polygonscan.com',
};
