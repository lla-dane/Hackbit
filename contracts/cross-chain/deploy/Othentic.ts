import assert from "assert";

import { type DeployFunction } from "hardhat-deploy/types";

// TODO declare your contract name here
const contractName = "OrderBook";

const deploy: DeployFunction = async (hre) => {
  const { getNamedAccounts, deployments } = hre;

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  assert(deployer, "Missing named deployer account");

  console.log(`Network: ${hre.network.name}`);
  console.log(`Deployer: ${deployer}`);


  const { address } = await deploy(contractName, {
    from: deployer,
    args: [
      process.env.ATTESTATION_CENTER_ADDRESS
    ],
    log: true,
    skipIfAlreadyDeployed: false,
  });

  console.log(
    `Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`
  );
};

deploy.tags = [contractName];

export default deploy;
