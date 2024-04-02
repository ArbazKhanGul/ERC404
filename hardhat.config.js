require("@nomicfoundation/hardhat-toolbox");
// require('@nomiclabs/hardhat-etherscan');
// require("@nomicfoundation/hardhat-verify");
require("dotenv").config(); // Import dotenv to use environment variables

const { PRIVATE_KEY_1, PRIVATE_KEY_2, PRIVATE_KEY_3 ,BSCSCAN_API_KEY} = process.env;


module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.23",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200 // Enabling optimization with 200 runs
          }
        },
      },
      // Include additional compiler versions and settings as needed
    ],
  },
  networks: {
    hardhat: {
      accounts: [
        { privateKey: PRIVATE_KEY_1, balance: "10000000000000000000000" }, // Example balance: 10000 ETH for the first account
        { privateKey: PRIVATE_KEY_2, balance: "10000000000000000000000" }, // Example balance: 10000 ETH for the second account
        { privateKey: PRIVATE_KEY_3, balance: "10000000000000000000000" }, // Example balance: 10000 ETH for the third account
      ],
    },
    lineaGoerli: {
      url: "https://rpc.goerli.linea.build",
      accounts: [PRIVATE_KEY_1],
      chainId: 59140,
      blockExplorerUrls: ["https://goerli.lineascan.build"],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/", // BNB Testnet RPC URL
      accounts: [PRIVATE_KEY_1], // Using provided private keys for deployment
      chainId: 97, // Chain ID for BNB Testnet
    },
    base: {
      url: "https://mainnet.base.org", 
      accounts: [PRIVATE_KEY_1], 
      chainId: 8453, 
      blockExplorerUrls: ["https://basescan.org"]

    },
  },
  etherscan: {
    // Configuration for contract verification
    apiKey: {
      bscTestnet: BSCSCAN_API_KEY,
        },
  },
  sourcify: {
  enabled: true
}
};


// npx hardhat verify --network bscTestnet 0x5B25006a2D4415D4A62469BB44583ED090213e7e "0xf9beff161423cbA6B79515386E90C6004FEA39df"
// npx hardhat run --network bscTestnet scripts/deploy.js
// npx hardhat console --network localhost