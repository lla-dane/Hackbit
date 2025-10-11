import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import * as dotenv from "dotenv";

dotenv.config();

const ATTESTATION_ADDR = process.env.ATTESTATION_CENTER_ADDRESS;

const OrderBookModule = buildModule("OrderBookModule", (m) => {
  const orderBook = m.contract("OrderBook", [ATTESTATION_ADDR]);
  return { orderBook };
});

module.exports = OrderBookModule;
