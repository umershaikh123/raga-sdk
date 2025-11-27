export class ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClientError';
  }
}

export class InvalidChainError extends ClientError {
  constructor(public readonly chainId: number) {
    super(`Invalid or unsupported chain ID: ${chainId}`);
    this.name = 'InvalidChainError';
  }
}

export class InvalidAddressError extends ClientError {
  constructor(public readonly address: string) {
    super(`Invalid Ethereum address: ${address}`);
    this.name = 'InvalidAddressError';
  }
}

export class RpcError extends ClientError {
  constructor(message: string, public readonly rpcUrl?: string) {
    super(`RPC error${rpcUrl ? ` (${rpcUrl})` : ''}: ${message}`);
    this.name = 'RpcError';
  }
}

export class NetworkError extends ClientError {
  constructor(message: string, public readonly chainId?: number) {
    super(`Network error${chainId ? ` on chain ${chainId}` : ''}: ${message}`);
    this.name = 'NetworkError';
  }
}
