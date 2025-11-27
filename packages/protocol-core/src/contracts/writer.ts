import type { WalletClient, Abi } from 'viem';
import type { WriteContractParams } from './types.js';
import { ContractWriteError } from '../errors/index.js';

export class ContractWriter {
  constructor(private client: WalletClient) {}

  async write<TAbi extends Abi>(
    params: WriteContractParams<TAbi>
  ): Promise<`0x${string}`> {
    try {
      const hash = await this.client.writeContract({
        address: params.address,
        abi: params.abi,
        functionName: params.functionName as any,
        args: params.args as any,
        account: params.account,
        value: params.value,
      } as any);
      return hash;
    } catch (error) {
      throw new ContractWriteError(
        error instanceof Error ? error.message : 'Unknown error',
        params.functionName
      );
    }
  }
}
