import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
// import * as tenderly from "@tenderly/hardhat-tenderly";

import "hardhat-contract-sizer";
import "hardhat-gas-reporter";

import { HardhatUserConfig } from "hardhat/config";
import type { HttpNetworkUserConfig } from "hardhat/types";

import "./tasks/deploy-adapters";
import "./tasks/deploy-mastercopy";
import "./tasks/deploy-proxy";
import "./tasks/deploy-standalone";

// Load environment variables.
// tenderly.setup({ automaticVerifications: true });
dotenv.config();
const {
  INFURA_KEY,
  PK,
  MNEMONIC,
  ETHERSCAN_API_KEY,
  OPTIMISTIC_ETHERSCAN_API_KEY,
  GNOSISSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  ARBISCAN_API_KEY,
  SNOWTRACE_API_KEY,
} = process.env;

const sharedNetworkConfig: HttpNetworkUserConfig = {};
if (PK) {
  sharedNetworkConfig.accounts = [PK];
} else {
  sharedNetworkConfig.accounts = {
    mnemonic:
      MNEMONIC ||
      "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",
  };
}

const config: HardhatUserConfig = {
  paths: {
    artifacts: "build/artifacts",
    cache: "build/cache",
    sources: "contracts",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.21",
        settings: {
          evmVersion: "shanghai",
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      { version: "0.8.6" },
      { version: "0.6.12" },
      { version: "0.8.17" },
      { version: "0.8.20" },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/SqoCsRkBdmlaxpfOaLS3QXOxiQ7BQ1dz",
      },
      allowUnlimitedContractSize: true,
    },
    mainnet: {
      ...sharedNetworkConfig,
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    },
    optimism: {
      ...sharedNetworkConfig,
      chainId: 10,
      url: "https://mainnet.optimism.io",
    },
    gnosis: {
      ...sharedNetworkConfig,
      chainId: 100,
      url: "https://rpc.gnosischain.com",
    },
    sepolia: {
      ...sharedNetworkConfig,
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
    },
    matic: {
      ...sharedNetworkConfig,
      chainId: 137,
      url: "https://rpc-mainnet.maticvigil.com",
    },
    arbitrum: {
      ...sharedNetworkConfig,
      chainId: 42161,
      url: "https://arb1.arbitrum.io/rpc",
    },
    avalanche: {
      ...sharedNetworkConfig,
      chainId: 43114,
      url: "https://rpc.ankr.com/avalanche",
    },
  },
  tenderly: {
    // https://docs.tenderly.co/account/projects/account-project-slug
    project: process.env.TENDERLY_PROJECT_ID as string,
    username: process.env.TENDERLY_ACCOUNT as string,
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
      optimism: OPTIMISTIC_ETHERSCAN_API_KEY,
      gnosis: GNOSISSCAN_API_KEY,
      matic: POLYGONSCAN_API_KEY,
      arbitrum: ARBISCAN_API_KEY,
      avalanche: SNOWTRACE_API_KEY,
    } as Record<string, string>,
    customChains: [
      {
        network: "optimism",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io/api",
          browserURL: "https://optimistic.etherscan.io",
        },
      },
      {
        network: "gnosis",
        chainId: 100,
        urls: {
          apiURL: "https://api.gnosisscan.io/api",
          browserURL: "https://www.gnosisscan.io",
        },
      },
      {
        network: "matic",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://www.polygonscan.com",
        },
      },
      {
        network: "arbitrum",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://www.arbiscan.io",
        },
      },
      {
        network: "avalanche",
        chainId: 43114,
        urls: {
          apiURL: "https://api.snowtrace.io/api",
          browserURL: "https://www.snowtrace.io",
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
  },
  mocha: {
    timeout: 2000000,
  },
};

export default config;
