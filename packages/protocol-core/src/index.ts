// Client exports
export {
  ProtocolPublicClient,
  ProtocolWalletClient,
  type PublicClientConfig,
  type WalletClientConfig,
} from './client/index.js';

// Contract operation exports
export {
  ContractReader,
  ContractWriter,
  EventListener,
  Multicall,
  type ReadContractParams,
  type WriteContractParams,
  type EventListenerParams,
  type MulticallParams,
} from './contracts/index.js';

// ABI exports
export {
  ERC20ABI,
  ERC721ABI,
  SimpleStorageABI,
  NFTMarketplaceABI,
  StakingABI,
} from './abis/index.js';

// Constants exports
export {
  SUPPORTED_CHAINS,
  DEFAULT_RPC_URLS,
  BLOCK_EXPLORERS,
  SIMPLE_STORAGE_ADDRESSES,
  NFT_MARKETPLACE_ADDRESSES,
  STAKING_ADDRESSES,
  type SupportedChainId,
  type ContractAddresses,
} from './constants/index.js';

// Utils exports
export {
  formatAddress,
  formatTokenAmount,
  formatEthAmount,
  parseTokenAmount,
  parseEthAmount,
  formatTxHash,
  getBlockExplorerUrl,
  validateAddress,
  isValidAddress,
  isValidTxHash,
  validateAmount,
  isValidChainId,
  validateChainId,
} from './utils/index.js';

// Error exports
export {
  ContractError,
  ContractReadError,
  ContractWriteError,
  EventListenerError,
  MulticallError,
  ClientError,
  InvalidChainError,
  InvalidAddressError,
  RpcError,
  NetworkError,
} from './errors/index.js';
