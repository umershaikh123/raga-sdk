import type { Address } from 'viem';
import { formatEther, formatUnits, parseEther, parseUnits } from 'viem';

export function formatAddress(address: Address, startChars = 6, endChars = 4): string {
  if (!address || address.length < startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function formatTokenAmount(
  amount: bigint,
  decimals: number = 18,
  displayDecimals: number = 4
): string {
  const formatted = formatUnits(amount, decimals);
  const num = parseFloat(formatted);

  if (num === 0) return '0';
  if (num < 0.0001) return '< 0.0001';

  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: displayDecimals,
  });
}

export function formatEthAmount(weiAmount: bigint, displayDecimals: number = 4): string {
  const ethAmount = formatEther(weiAmount);
  const num = parseFloat(ethAmount);

  if (num === 0) return '0 ETH';
  if (num < 0.0001) return '< 0.0001 ETH';

  return `${num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: displayDecimals,
  })} ETH`;
}

export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  return parseUnits(amount, decimals);
}

export function parseEthAmount(amount: string): bigint {
  return parseEther(amount);
}

export function formatTxHash(hash: string, startChars = 10, endChars = 8): string {
  if (!hash || hash.length < startChars + endChars) {
    return hash;
  }
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
}

export function getBlockExplorerUrl(chainId: number, hash: string, type: 'tx' | 'address' | 'block' = 'tx'): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
    8453: 'https://basescan.org',
    84532: 'https://sepolia.basescan.org',
    10: 'https://optimistic.etherscan.io',
    42161: 'https://arbiscan.io',
    137: 'https://polygonscan.com',
  };

  const baseUrl = explorers[chainId] || 'https://etherscan.io';
  return `${baseUrl}/${type}/${hash}`;
}
