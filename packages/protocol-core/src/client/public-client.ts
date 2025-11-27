import { createPublicClient, http } from 'viem';
import type { PublicClient, Chain } from 'viem';
import type { PublicClientConfig } from './types.js';
import { RpcError } from '../errors/index.js';

export class ProtocolPublicClient {
  private client: PublicClient;
  private config: PublicClientConfig;

  constructor(config: PublicClientConfig) {
    this.config = config;

    try {
      this.client = createPublicClient({
        chain: config.chain,
        transport: http(config.rpcUrl),
        pollingInterval: config.pollingInterval,
      });
    } catch (error) {
      throw new RpcError(
        `Failed to create public client: ${error instanceof Error ? error.message : 'Unknown error'}`,
        config.rpcUrl
      );
    }
  }

  getClient(): PublicClient {
    return this.client;
  }

  getChain(): Chain {
    return this.config.chain;
  }

  async getBlockNumber(): Promise<bigint> {
    try {
      return await this.client.getBlockNumber();
    } catch (error) {
      throw new RpcError(
        `Failed to get block number: ${error instanceof Error ? error.message : 'Unknown error'}`,
        this.config.rpcUrl
      );
    }
  }

  async getBalance(address: `0x${string}`): Promise<bigint> {
    try {
      return await this.client.getBalance({ address });
    } catch (error) {
      throw new RpcError(
        `Failed to get balance for ${address}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        this.config.rpcUrl
      );
    }
  }

  async getGasPrice(): Promise<bigint> {
    try {
      return await this.client.getGasPrice();
    } catch (error) {
      throw new RpcError(
        `Failed to get gas price: ${error instanceof Error ? error.message : 'Unknown error'}`,
        this.config.rpcUrl
      );
    }
  }
}
