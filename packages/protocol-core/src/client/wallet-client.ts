import { createWalletClient, http } from 'viem';
import type { WalletClient, Chain, Account } from 'viem';
import type { WalletClientConfig } from './types.js';
import { RpcError } from '../errors/index.js';

export class ProtocolWalletClient {
  private client: WalletClient;
  private config: WalletClientConfig;

  constructor(config: WalletClientConfig) {
    this.config = config;

    try {
      this.client = createWalletClient({
        chain: config.chain,
        transport: http(config.rpcUrl),
        account: config.account,
      });
    } catch (error) {
      throw new RpcError(
        `Failed to create wallet client: ${error instanceof Error ? error.message : 'Unknown error'}`,
        config.rpcUrl
      );
    }
  }

  getClient(): WalletClient {
    return this.client;
  }

  getChain(): Chain {
    return this.config.chain;
  }

  getAccount(): `0x${string}` | undefined {
    return this.config.account;
  }

  async sendTransaction(params: {
    to: `0x${string}`;
    value?: bigint;
    data?: `0x${string}`;
  }): Promise<`0x${string}`> {
    if (!this.config.account) {
      throw new Error('No account configured for wallet client');
    }

    try {
      return await this.client.sendTransaction({
        account: this.config.account,
        chain: this.config.chain,
        ...params,
      });
    } catch (error) {
      throw new RpcError(
        `Failed to send transaction: ${error instanceof Error ? error.message : 'Unknown error'}`,
        this.config.rpcUrl
      );
    }
  }
}
