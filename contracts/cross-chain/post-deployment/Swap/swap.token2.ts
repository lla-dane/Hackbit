// Token1 deployed in AMOY

import "dotenv/config";
import { ethers } from "hardhat";

import { Options } from "@layerzerolabs/lz-v2-utilities";
import { EndpointId } from "@layerzerolabs/lz-definitions";

const FUJI_EID = EndpointId.AVALANCHE_V2_TESTNET;
const AMOY_EID = EndpointId.AMOY_V2_TESTNET;

const ZRO1_ADDR = process.env.ZRO1_ADDR;
const ZRO2_ADDR = process.env.ZRO2_ADDR;

import { ZRO2_ABI } from "../../ABI";

async function main() {
  const [signer] = await ethers.getSigners();
  const token2 = new ethers.Contract(ZRO2_ADDR, ZRO2_ABI, signer);

  const options = Options.newOptions()
    .addExecutorLzReceiveOption(500000, 0)
    .toHex()
    .toString();

  let nativeFee = 0;
  [nativeFee] = await token2.quote(
    AMOY_EID,
    ethers.utils.parseUnits("250", 18),
    signer.address,
    "SWAP",
    options,
    false
  );

  console.log("GAS NEEDED: ", ethers.utils.formatUnits(nativeFee.toString()));

  // await token2.lzSend(
  //   AMOY_EID,
  //   ethers.utils.parseUnits("199", 18),
  //   signer.address,
  //   "SWAP",
  //   options,
  //   {
  //     value: nativeFee.toString(),
  //     gasLimit: ethers.BigNumber.from("3000000"),
  //   }
  // );

  console.log(
    "OWNER BALANCE: ",
    ethers.utils.formatUnits(await token2.balanceOf(signer.address))
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
