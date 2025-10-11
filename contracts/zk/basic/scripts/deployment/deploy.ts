// scripts/deploy.ts

import { ethers } from 'hardhat'

async function main() {
    const [deployer] = await ethers.getSigners()

    console.log('Deploying contracts with the account:', deployer.address)
    console.log('Account balance:', (await deployer.getBalance()).toString())

    // Deploy the PlonkVerifier
    const PlonkVerifier = await ethers.getContractFactory('PlonkVerifier')
    const plonkVerifier = await PlonkVerifier.deploy()
    await plonkVerifier.deployed()
    console.log('PlonkVerifier deployed to:', plonkVerifier.address)

    // Deploy the SimpleMultiplier with the address of PlonkVerifier
    const SimpleMultiplier = await ethers.getContractFactory('SimpleMultiplier')
    const simpleMultiplier = await SimpleMultiplier.deploy(plonkVerifier.address)
    await simpleMultiplier.deployed()
    console.log('SimpleMultiplier deployed to:', simpleMultiplier.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
