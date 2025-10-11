import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import * as dotenv from "dotenv";

dotenv.config();

const OZT1 = "0x04B627FA40Ca9D36B4F22e5Fe1B4C7DD2A78e667";
const OZT2 = "0xB0a5f5E762636af9b77F0471E12C7Ea6b15a0b29";

const PoolModule = buildModule("PoolModule", (m) => {
  const pool = m.contract("LiquidityPool", [OZT1, OZT2]);
  return { pool };
});

module.exports = PoolModule;
