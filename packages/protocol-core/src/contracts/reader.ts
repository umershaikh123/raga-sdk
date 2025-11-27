import type { PublicClient, Abi } from 'viem';
import type { ReadContractParams } from './types.js';
import { ContractReadError } from '../errors/index.js';

export class ContractReader {
  constructor(private client: PublicClient) {}

  async read<TAbi extends Abi, TResult = unknown>(
    params: ReadContractParams<TAbi>
  ): Promise<TResult> {
    try {
      const result = await this.client.readContract({
        address: params.address,
        abi: params.abi,
        functionName: params.functionName as any,
        args: params.args as any,
      } as any);
      return result as TResult;
    } catch (error) {
      throw new ContractReadError(
        error instanceof Error ? error.message : 'Unknown error',
        params.functionName
      );
    }
  }

  async readMultiple<TResults extends readonly unknown[]>(
    params: ReadContractParams[]
  ): Promise<TResults> {
    try {
      const promises = params.map((param) => this.read(param));
      const results = await Promise.all(promises);
      return results as unknown as TResults;
    } catch (error) {
      throw new ContractReadError(
        error instanceof Error ? error.message : 'Unknown error',
        'multiple'
      );
    }
  }
}
