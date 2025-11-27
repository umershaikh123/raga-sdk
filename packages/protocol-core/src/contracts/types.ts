import type { Abi, Address } from 'viem';

export interface ReadContractParams<TAbi extends Abi = Abi> {
  address: Address;
  abi: TAbi;
  functionName: string;
  args?: readonly unknown[];
}

export interface WriteContractParams<TAbi extends Abi = Abi> {
  address: Address;
  abi: TAbi;
  functionName: string;
  args?: readonly unknown[];
  value?: bigint;
  account: Address;
}

export interface EventListenerParams<TAbi extends Abi = Abi> {
  address: Address;
  abi: TAbi;
  eventName: string;
  onLogs: (logs: unknown[]) => void;
  pollingInterval?: number;
}

export interface MulticallParams {
  contracts: ReadContractParams[];
  allowFailure?: boolean;
}
