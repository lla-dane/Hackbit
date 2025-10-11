import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { use, expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { deployments, ethers } from "hardhat";

import { Options } from "@layerzerolabs/lz-v2-utilities";

describe("Counter Test", function () {
  // Constant representing a mock Endpoint ID for testing purposes
  const eidA = 1;
  const eidB = 2;
  // Declaration of variables to be used in the test suite
  let ZRO1: ContractFactory;
  let ZRO2: ContractFactory;
  let EndpointV2Mock: ContractFactory;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let endpointOwner: SignerWithAddress;
  let token1: Contract;
  let token2: Contract;
  let mockEndpointV2A: Contract;
  let mockEndpointV2B: Contract;

  // Before hook for setup that runs once before all tests in the block
  before(async function () {
    // Contract factory for our tested contract
    ZRO1 = await ethers.getContractFactory("Token1");
    ZRO2 = await ethers.getContractFactory("Token2");

    // Fetching the first three signers (accounts) from Hardhat's local Ethereum network
    const signers = await ethers.getSigners();

    addr1 = signers.at(0)!;
    addr2 = signers.at(1)!;
    endpointOwner = signers.at(2)!;

    const EndpointV2MockArtifact =
      await deployments.getArtifact("EndpointV2Mock");
    EndpointV2Mock = new ContractFactory(
      EndpointV2MockArtifact.abi,
      EndpointV2MockArtifact.bytecode,
      endpointOwner
    );
  });

  // beforeEach hook for setup that runs before each test in the block
  beforeEach(async function () {
    // Deploying a mock LZ EndpointV2 with the given Endpoint ID
    mockEndpointV2A = await EndpointV2Mock.deploy(eidA);
    mockEndpointV2B = await EndpointV2Mock.deploy(eidB);

    // Deploying two instances of MyOApp contract and linking them to the mock LZEndpoint
    token1 = await ZRO1.deploy(mockEndpointV2A.address, addr1.address);
    token2 = await ZRO2.deploy(mockEndpointV2B.address, addr2.address);

    // Setting destination endpoints in the LZEndpoint mock for each MyOApp instance
    await mockEndpointV2A.setDestLzEndpoint(
      token2.address,
      mockEndpointV2B.address
    );
    await mockEndpointV2B.setDestLzEndpoint(
      token1.address,
      mockEndpointV2A.address
    );

    // Setting each MyOApp instance as a peer of the other
    await token1
      .connect(addr1)
      .setPeer(eidB, ethers.utils.zeroPad(token2.address, 32));

    await token2
      .connect(addr2)
      .setPeer(eidA, ethers.utils.zeroPad(token1.address, 32));
  });

  it("Should set the right owner and token balance", async function () {
    expect(await token1.owner()).to.equal(addr1.address);
    expect(await token2.owner()).to.equal(addr2.address);

    expect(
      ethers.utils.formatUnits(await token1.balanceOf(addr1.address))
    ).to.equal("1000.0");

    expect(
      ethers.utils.formatUnits(await token2.balanceOf(addr2.address))
    ).to.equal("1000.0");
  });

  it("Should mint and burn (SWAP) tokens cross-chain", async function () {
    const options = Options.newOptions()
      .addExecutorLzReceiveOption(200000, 0)
      .toHex()
      .toString();

    let nativeFee = 0;
    [nativeFee] = await token1.quote(
      eidB,
      ethers.utils.parseUnits("250", 18),
      addr1.address,
      "SWAP",
      options,
      false
    );

    await token1.lzSend(
      eidB,
      ethers.utils.parseUnits("250", 18),
      addr1.address,
      "SWAP",
      options,
      {
        value: nativeFee.toString(),
      }
    );

    expect(ethers.utils.formatUnits(await token1.balanceOf(addr1.address))).to.equal("750.0")
    expect(
      ethers.utils.formatUnits(await token2.balanceOf(addr1.address))
    ).to.equal("250.0");
  });
});
