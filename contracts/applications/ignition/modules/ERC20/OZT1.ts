import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OZTokenModule = buildModule("OZTokenModule", (m) => {
  const token = m.contract("OZT1");
  return { token };
});

module.exports = OZTokenModule;
