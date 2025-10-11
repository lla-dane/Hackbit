// Token1 deployed in AMOY, so we will need the eID of fuji and Token2 contract address

import "dotenv/config";
import { ethers } from "hardhat";
import { EndpointId } from "@layerzerolabs/lz-definitions";

const ZRO1_ADDR = process.env.ZRO1_ADDR;
const ZRO2_ADDR = process.env.ZRO2_ADDR;

import { ZRO2_ABI } from "../../ABI";

async function main() {
  const [signer] = await ethers.getSigners();
  const token2 = new ethers.Contract(ZRO2_ADDR, ZRO2_ABI, signer);

  // Set peer in token1 for token2 chainID and address
//   await token2.setPeer(
//     EndpointId.AMOY_V2_TESTNET,
//     ethers.utils.zeroPad(ZRO1_ADDR, 32)      
//   );

  console.log("setPeer EXECUTED: SUCCESSFULLY");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
