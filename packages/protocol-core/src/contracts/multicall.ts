import type { PublicClient } from 'viem';
import type { MulticallParams, ReadContractParams } from './types.js';
import { MulticallError } from '../errors/index.js';

export class Multicall {
  constructor(private client: PublicClient) {}

  async batch<TResults extends readonly unknown[]>(
    params: MulticallParams
  ): Promise<TResults> {
    try {
      const contracts = params.contracts.map((contract) => ({
        address: contract.address,
        abi: contract.abi,
        functionName: contract.functionName,
        args: contract.args,
      }));

      const results = await this.client.multicall({
        contracts: contracts as any,
        allowFailure: params.allowFailure ?? false,
      });

      return results.map((result: any) => result.result) as unknown as TResults;
    } catch (error) {
      throw new MulticallError(
        error instanceof Error ? error.message : 'Unknown error',
        params.contracts.length
      );
    }
  }

  async batchRead<TResults extends readonly unknown[]>(
    contracts: ReadContractParams[]
  ): Promise<TResults> {
    return this.batch<TResults>({ contracts, allowFailure: false });
  }

  async batchReadWithFailure<TResults extends readonly unknown[]>(
    contracts: ReadContractParams[]
  ): Promise<TResults> {
    return this.batch<TResults>({ contracts, allowFailure: true });
  }
}
