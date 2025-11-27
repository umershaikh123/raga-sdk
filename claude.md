# Raga SDK - Implementation Guide

## Project Overview

This is a professional TypeScript SDK for Ethereum/EVM blockchain interactions built as a Turborepo monorepo. The SDK consists of two main packages:

- **@protocol/core**: Pure TypeScript blockchain logic using viem
- **@protocol/react**: React hooks and components using wagmi

## Architecture

### Technology Stack

**Core Dependencies:**
- **viem** (2.21.54+): Modern Ethereum library - 10x smaller and faster than ethers.js
- **wagmi** (2.0.0+): Industry-standard React hooks for Ethereum
- **@tanstack/react-query** (5.0.0+): Async state management for wagmi

**Build & Test:**
- **tsup**: Zero-config bundler (esbuild-based) - outputs CJS + ESM + .d.ts
- **vitest**: Modern test runner - 10-20x faster than Jest
- **Turborepo**: Monorepo orchestration with intelligent caching

**Why This Stack?**
- **Viem**: Better TypeScript inference, smaller bundles, modern API
- **Wagmi**: Battle-tested (Uniswap uses it), auto-caching, wallet connectors included
- **Tsup**: Fast builds, zero config, perfect TypeScript DTS generation
- **Vitest**: Native ESM support, Vite ecosystem compatibility

## Monorepo Structure

```
raga-sdk/
├── apps/
│   ├── web/           # Next.js demo app
│   └── docs/          # Next.js documentation site
├── packages/
│   ├── protocol-core/      # NEW: Core blockchain logic
│   ├── protocol-react/     # NEW: React hooks & components
│   ├── ui/                 # Existing: Shared UI components
│   ├── typescript-config/  # Existing: Shared TS configs
│   └── eslint-config/      # Existing: Shared ESLint configs
├── turbo.json
└── pnpm-workspace.yaml
```

## Package: @protocol/core

### Purpose
Pure TypeScript package for blockchain interactions. No React dependencies.

### Directory Structure
```
packages/protocol-core/
├── src/
│   ├── index.ts              # Main exports
│   ├── client/               # Viem client wrappers
│   ├── contracts/            # Contract interaction utilities
│   ├── abis/                 # Contract ABIs (ERC20, ERC721, examples)
│   ├── constants/            # Chain configs, addresses
│   ├── utils/                # Formatting, validation
│   └── errors/               # Custom error types
├── test/                     # Vitest tests
├── package.json
├── tsup.config.ts
├── vitest.config.ts
├── tsconfig.json
└── eslint.config.mjs
```

### Key Features
1. **Client Wrappers**: Simplified viem public/wallet clients
2. **Contract Reader**: Type-safe contract reads
3. **Contract Writer**: Type-safe contract writes
4. **Event Listener**: Watch and filter contract events
5. **Multicall**: Batch multiple contract reads into single RPC call

### Exports

```typescript
// Main entry point
import { ContractReader, EventListener } from '@protocol/core';

// ABIs
import { ERC20ABI, SimpleStorageABI } from '@protocol/core/abis';

// Constants
import { SUPPORTED_CHAINS } from '@protocol/core/constants';
```

### Build Output
- **Format**: ESM (.js) + CJS (.cjs) + TypeScript definitions (.d.ts)
- **Entry points**: Main, ABIs, Constants (tree-shakeable)
- **Platform**: Neutral (works in Node.js and browser)

## Package: @protocol/react

### Purpose
React hooks and components for blockchain UIs. Built on wagmi.

### Directory Structure
```
packages/protocol-react/
├── src/
│   ├── index.ts              # Main exports
│   ├── hooks/
│   │   ├── contracts/        # Contract interaction hooks
│   │   ├── transactions/     # Transaction status hooks
│   │   └── utils/            # Utility hooks (debounce, localStorage)
│   ├── components/
│   │   ├── ConnectWallet/    # Wallet connection UI
│   │   ├── TransactionStatus/ # TX status display
│   │   ├── NetworkSwitch/    # Network switching UI
│   │   └── ContractInteraction/ # Generic contract UI
│   ├── context/              # React context providers
│   └── utils/                # Error handlers, notifications
├── test/                     # Vitest + React Testing Library
├── package.json
├── tsup.config.ts
├── vitest.config.ts
├── tsconfig.json
└── eslint.config.mjs
```

### Key Hooks

**useContractRead**
- Wraps wagmi's useReadContract
- Auto-caching via react-query
- Loading/error states
- Optional watch mode (polling)

**useContractWrite**
- Wraps wagmi's useWriteContract
- Transaction status tracking
- Wait for confirmation
- Comprehensive error handling

**useContractEvent**
- Real-time event listening
- Callback on new events
- Automatic cleanup

**useMulticall**
- Batch multiple contract reads
- Single RPC call for efficiency
- Parallel loading states

### Key Components

**ConnectWallet**
- Display wallet connection UI
- Show connected address
- Disconnect button
- Connector selection (MetaMask, WalletConnect, etc.)

**TransactionStatus**
- Show tx states: pending → confirming → success/error
- Display transaction hash
- Link to block explorer

**NetworkSwitch**
- Switch between networks
- Show current network
- Prompt user to switch if needed

### Exports

```typescript
// Hooks
import { useContractRead, useContractWrite } from '@protocol/react/hooks';

// Components
import { ConnectWallet, TransactionStatus } from '@protocol/react/components';

// All in one
import { useContractRead, ConnectWallet } from '@protocol/react';
```

### Dependencies
- **Production**: @protocol/core (workspace)
- **Peer**: react, react-dom, wagmi, @tanstack/react-query, viem
- **Dev**: @testing-library/react, jsdom, vitest

## Build Configuration

### Turborepo (turbo.json)

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

**Build Order:**
1. @protocol/core (no deps) builds first
2. @protocol/react (depends on core) builds second
3. Apps (depend on packages) build last

### Tsup Configuration

**@protocol/core**:
- Entry points: index, abis/index, constants/index
- External: viem
- Platform: neutral

**@protocol/react**:
- Entry points: index, hooks/index, components/index
- External: react, react-dom, wagmi, viem, @protocol/core
- Platform: browser
- JSX: automatic (React 17+ runtime)

### TypeScript Configuration

**@protocol/core**: Extends `@repo/typescript-config/base.json`
**@protocol/react**: Extends `@repo/typescript-config/react-library.json`

### ESLint Configuration

**New config needed**: `packages/eslint-config/react-library.js`
- Extends base config
- Adds react and react-hooks plugins
- Rules: hooks validation, no React import needed (new JSX transform)

## Testing Strategy

### Vitest Setup

**@protocol/core**:
- Environment: node
- Coverage target: 80%
- Mocking: Viem clients

**@protocol/react**:
- Environment: jsdom
- Coverage target: 75%
- Mocking: Wagmi hooks
- Testing Library: @testing-library/react

### Test Patterns

**Mock Viem Client**:
```typescript
import { vi } from 'vitest';
import type { PublicClient } from 'viem';

export const createMockPublicClient = (): PublicClient => ({
  readContract: vi.fn(),
  multicall: vi.fn(),
  watchEvent: vi.fn(),
} as unknown as PublicClient);
```

**Test React Hook**:
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useContractRead } from '@/hooks/contracts/useContractRead';
import { createWrapper } from '../test-utils';

const { result } = renderHook(
  () => useContractRead({ ... }),
  { wrapper: createWrapper() }
);
```

## Example Smart Contracts

### 1. SimpleStorage (Educational)
- Functions: `get()`, `set(uint256)`
- Events: `ValueChanged(uint256)`
- Purpose: Basic read/write demonstration

### 2. NFTMarketplace (Advanced)
- Functions: `listNFT`, `buyNFT`, `cancelListing`
- Events: `NFTListed`, `NFTSold`, `ListingCancelled`
- Purpose: Complex marketplace interactions

### 3. Staking (DeFi)
- Functions: `stake`, `unstake`, `claimRewards`, `getStakedBalance`
- Events: `Staked`, `Unstaked`, `RewardsClaimed`
- Purpose: DeFi patterns demonstration

### Standard ABIs
- ERC20.ts
- ERC721.ts

All ABIs use `as const` for proper TypeScript inference with viem.

## Integration Example

### In apps/web/app/page.tsx

```typescript
'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { sepolia } from 'wagmi/chains';
import { ConnectWallet, TransactionStatus } from '@protocol/react/components';
import { useContractRead, useContractWrite } from '@protocol/react/hooks';
import { SimpleStorageABI, SimpleStorageAddresses } from '@protocol/core/abis';

const config = createConfig({
  chains: [sepolia],
  transports: { [sepolia.id]: http() },
});

const queryClient = new QueryClient();

function StorageDemo() {
  const { data: value } = useContractRead({
    address: SimpleStorageAddresses[11155111],
    abi: SimpleStorageABI,
    functionName: 'get',
  });

  const { write, hash, isPending, isConfirming, isSuccess } = useContractWrite({
    address: SimpleStorageAddresses[11155111],
    abi: SimpleStorageABI,
    functionName: 'set',
  });

  return (
    <div>
      <h1>Simple Storage Demo</h1>
      <ConnectWallet />
      <p>Current value: {value?.toString()}</p>
      <button onClick={() => write([42n])}>Set to 42</button>
      <TransactionStatus
        hash={hash}
        isPending={isPending}
        isConfirming={isConfirming}
        isSuccess={isSuccess}
      />
    </div>
  );
}

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <StorageDemo />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Implementation Phases

### Phase 1: Infrastructure ✅ COMPLETED
- [x] Create package directories
- [x] Set up package.json files
- [x] Create build configs (tsup, TypeScript)
- [x] Create test configs (vitest)
- [x] Update turbo.json
- [x] Create ESLint react-library config
- [x] Run `pnpm install`

### Phase 2: @protocol/core ✅ COMPLETED
- [x] Constants (chains, addresses)
- [x] ABIs (ERC20, ERC721, examples)
- [x] Errors (custom error classes)
- [x] Utils (formatting, validation)
- [x] Client wrappers
- [x] Contract operations (reader, writer, events, multicall)
- [x] Build and verify (ESM + CJS + .d.ts)
- [ ] Tests (deferred - will add later if needed)

### Phase 3: @protocol/react
- [ ] Hooks (useContractRead, useContractWrite, useContractEvent, useMulticall)
- [ ] Context (ProtocolProvider)
- [ ] Components (ConnectWallet, TransactionStatus, NetworkSwitch)
- [ ] Utils (error handlers, notifications)
- [ ] Tests (75% coverage target)
- [ ] Build and verify

### Phase 4: Integration & Testing
- [ ] Update web app with demo
- [ ] Full monorepo build test
- [ ] Verify Turborepo caching
- [ ] Test with real wallets (MetaMask)

### Phase 5: Documentation
- [ ] @protocol/core README
- [ ] @protocol/react README
- [ ] Root README update
- [ ] API documentation

## Commands

### Development
```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Dev mode (watch)
pnpm dev

# Run tests
pnpm test

# Lint
pnpm lint

# Type check
pnpm check-types
```

### Package-Specific
```bash
# Build single package
cd packages/protocol-core && pnpm build

# Test with coverage
cd packages/protocol-core && pnpm test:coverage

# Watch mode
cd packages/protocol-core && pnpm dev
```

## File Naming Conventions

- **Components**: PascalCase.tsx (ConnectWallet.tsx)
- **Hooks**: camelCase.ts with `use` prefix (useContractRead.ts)
- **Utils**: camelCase.ts (formatting.ts)
- **Types**: Co-located .types.ts files (ConnectWallet.types.ts)
- **Tests**: Same name + .test.ts(x) (useContractRead.test.tsx)
- **Index files**: Always index.ts for re-exports
- **Directories**: kebab-case (protocol-core, protocol-react)

## Key Architectural Decisions

### 1. Why Separate Packages?
- **@protocol/core**: Reusable in Node.js, other frameworks
- **@protocol/react**: React-specific, lighter bundle if core-only is needed
- **Testing**: Easier to test pure TS separately from React

### 2. Why Multiple Entry Points?
- Tree-shaking: Import only what you need
- Smaller bundles: Better performance
- Flexibility: Use hooks without components, etc.

### 3. Why Peer Dependencies for React Package?
- No bundling of React/wagmi - user's app provides them
- Prevents version conflicts
- Smaller package size

### 4. Why viem ABIs with `as const`?
- Full TypeScript inference
- Type-safe function names and arguments
- No manual type definitions needed

## Challenges & Solutions

**Challenge 1: Wagmi provider setup in tests**
→ Solution: Create test-utils.tsx with pre-configured providers

**Challenge 2: Type inference with viem ABIs**
→ Solution: Always use `as const` for ABIs, explicit type parameters where needed

**Challenge 3: Turborepo cache invalidation**
→ Solution: Use watch mode during dev, `pnpm turbo clean` if cache is stale

**Challenge 4: Peer dependency version conflicts**
→ Solution: Wide ranges (>=18.0.0), clear documentation in README

## Future Enhancements (Post-MVP)

- Multi-chain support (Polygon, Arbitrum, Optimism, etc.)
- Gas optimization utilities
- ENS integration
- Transaction simulation (Tenderly)
- Subgraph integration for querying indexed data
- Account abstraction (ERC-4337)
- Mobile WalletConnect improvements

## Current Implementation Status

### ✅ Completed
1. **Infrastructure Setup**
   - All package directories created
   - package.json for both @protocol/core and @protocol/react
   - tsup.config.ts for both packages (ESM + CJS output)
   - vitest.config.ts for both packages (Node + jsdom)
   - tsconfig.json extending monorepo configs
   - turbo.json updated with test tasks and dist/** outputs
   - ESLint react-library config created
   - Dependencies installed (188 packages)

2. **@protocol/core - Constants**
   - chains.ts: 7 supported chains (mainnet, sepolia, base, etc.)
   - addresses.ts: Contract address mappings
   - DEFAULT_RPC_URLS and BLOCK_EXPLORERS

3. **@protocol/core - ABIs**
   - ERC20.ts: Full ERC20 ABI with Transfer/Approval events
   - ERC721.ts: Full ERC721 ABI with Transfer/Approval events
   - SimpleStorage.ts: Educational contract (get, set, ValueChanged)
   - NFTMarketplace.ts: Advanced marketplace (listNFT, buyNFT, cancelListing)
   - Staking.ts: DeFi staking (stake, unstake, claimRewards)
   - All ABIs use `as const` for TypeScript inference

4. **@protocol/core - Errors**
   - ContractError, ContractReadError, ContractWriteError
   - EventListenerError, MulticallError
   - ClientError, InvalidChainError, InvalidAddressError
   - RpcError, NetworkError

5. **@protocol/core - Utils**
   - formatting.ts: formatAddress, formatTokenAmount, formatEthAmount, formatTxHash, getBlockExplorerUrl
   - validation.ts: validateAddress, isValidAddress, isValidTxHash, validateChainId

6. **@protocol/core - Client Wrappers**
   - ProtocolPublicClient: Read-only viem client wrapper (getBlockNumber, getBalance, getGasPrice)
   - ProtocolWalletClient: Wallet client wrapper (sendTransaction)

7. **@protocol/core - Contract Operations**
   - ContractReader: Type-safe contract reads, readMultiple
   - ContractWriter: Type-safe contract writes
   - EventListener: Watch events, getLogs
   - Multicall: Batch reads, batchReadWithFailure

8. **@protocol/core - Build Output**
   - ✅ ESM (.js) + CJS (.cjs) bundles
   - ✅ TypeScript definitions (.d.ts, .d.cts)
   - ✅ Source maps (.js.map, .cjs.map)
   - ✅ Tree-shakeable entry points (main, abis, constants)
   - ✅ Total bundle size: ~25KB (ESM), ~26KB (CJS)

### 🚧 Next Steps
1. Implement @protocol/react hooks (useContractRead, useContractWrite, useContractEvent, useMulticall)
2. Implement @protocol/react components (ConnectWallet, TransactionStatus, NetworkSwitch)
3. Build and verify @protocol/react
4. Update web app with demo integration
5. Create comprehensive documentation

## Success Criteria

**Build:**
- [ ] `pnpm build` succeeds with proper caching
- [ ] Both packages output to dist/
- [ ] Type definitions (.d.ts) generated
- [ ] Both ESM and CJS formats available

**Tests:**
- [ ] All tests pass
- [ ] Coverage meets thresholds (80% core, 75% react)
- [ ] No flaky tests

**Integration:**
- [ ] Web app successfully imports packages
- [ ] Demo works with real wallet
- [ ] All hooks function correctly
- [ ] Components render properly

**Code Quality:**
- [ ] No ESLint errors
- [ ] No TypeScript errors
- [ ] Consistent code style

## Resources

- [Viem Documentation](https://viem.sh)
- [Wagmi Documentation](https://wagmi.sh)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Vitest Documentation](https://vitest.dev)
- [Tsup Documentation](https://tsup.egoist.dev)

## Contact & Support

For questions or issues during implementation, refer to:
- Plan file: `.claude/plans/rippling-prancing-penguin.md`
- Turborepo docs: https://turbo.build/repo/docs
- Wagmi examples: https://wagmi.sh/examples
