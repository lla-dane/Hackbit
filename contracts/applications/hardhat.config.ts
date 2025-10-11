import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const INFURA_API = process.env.INFURA_API_KEY;
const pvt_key = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API}`,
      accounts: [pvt_key],
      gas: 1000000,
      gasPrice: 130000000000,
    },
    amoy: {
      url: `https://polygon-amoy.infura.io/v3/${INFURA_API}`,
      accounts: [pvt_key],
      gas: 1000000,
      gasPrice: 130000000000,
    },
    fuji: {
      url: `https://avalanche-fuji.infura.io/v3/${INFURA_API}`,
      accounts: [pvt_key],
      gas: 10000000,
      gasPrice: 130000000000,
    },
    holesky: {
      url: `https://holesky.infura.io/v3/${INFURA_API}`,
      accounts: [pvt_key],
      gas: "auto",
      gasPrice: 1_500_000_000,
    },
  },
};

export default config;
