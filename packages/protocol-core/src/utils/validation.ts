import { isAddress, isHex } from 'viem';
import type { Address } from 'viem';
import { InvalidAddressError } from '../errors/index.js';

export function validateAddress(address: string): Address {
  if (!isAddress(address)) {
    throw new InvalidAddressError(address);
  }
  return address as Address;
}

export function isValidAddress(address: string): boolean {
  return isAddress(address);
}

export function isValidTxHash(hash: string): boolean {
  return isHex(hash) && hash.length === 66;
}

export function validateAmount(amount: bigint): void {
  if (amount < 0n) {
    throw new Error('Amount cannot be negative');
  }
}

export function isValidChainId(chainId: number): boolean {
  const supportedChains = [1, 11155111, 8453, 84532, 10, 42161, 137];
  return supportedChains.includes(chainId);
}

export function validateChainId(chainId: number): void {
  if (!isValidChainId(chainId)) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
}
