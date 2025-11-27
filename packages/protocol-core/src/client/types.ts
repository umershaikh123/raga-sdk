import type { Chain, Transport } from 'viem';

export interface PublicClientConfig {
  chain: Chain;
  rpcUrl?: string;
  pollingInterval?: number;
}

export interface WalletClientConfig {
  chain: Chain;
  rpcUrl?: string;
  account?: `0x${string}`;
}
