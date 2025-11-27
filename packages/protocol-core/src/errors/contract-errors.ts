export class ContractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContractError';
  }
}

export class ContractReadError extends ContractError {
  constructor(message: string, public readonly functionName: string) {
    super(`Contract read failed for function "${functionName}": ${message}`);
    this.name = 'ContractReadError';
  }
}

export class ContractWriteError extends ContractError {
  constructor(message: string, public readonly functionName: string) {
    super(`Contract write failed for function "${functionName}": ${message}`);
    this.name = 'ContractWriteError';
  }
}

export class EventListenerError extends ContractError {
  constructor(message: string, public readonly eventName: string) {
    super(`Event listener failed for event "${eventName}": ${message}`);
    this.name = 'EventListenerError';
  }
}

export class MulticallError extends ContractError {
  constructor(message: string, public readonly callCount: number) {
    super(`Multicall failed with ${callCount} calls: ${message}`);
    this.name = 'MulticallError';
  }
}
