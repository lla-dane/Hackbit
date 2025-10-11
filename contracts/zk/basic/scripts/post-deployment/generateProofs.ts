import path from 'path'
import * as snarkjs from 'snarkjs'
import 'dotenv/config'
import { ethers } from 'hardhat'

const SIMPLE_MULTIPLIER_ADDR = process.env.SIMPLE_MULTIPLIER
import { SIMPLE_MULIPLIER_ABI } from '../../ABI'
import { call } from 'wagmi/actions'

async function main() {
    console.log('Genrating proofs !!')

    const inputs = {
        in: [3, 2],
    }

    const wasmPath = path.join(process.cwd(), 'circuits/build/simple_multiplier_js/simple_multiplier.wasm')
    const provingKeyPath = path.join(process.cwd(), 'circuits/build/proving_key.zkey')

    try {
        // Generate a proof of the circuit and create a structure for the output signals
        const { proof, publicSignals } = await snarkjs.plonk.fullProve(inputs, wasmPath, provingKeyPath)

        // Convert the data into Solidity calldata that can be sent as a transaction
        const calldataBlob = await snarkjs.plonk.exportSolidityCallData(proof, publicSignals)
        const calldata = calldataBlob.split(',')

        console.log('ZK-Proof: ', calldata[0])
        console.log('Public-Signals: ', JSON.parse(calldata[1]))

        console.log('Calldata: ', calldata)

        // console.log('Proofs generated !! Now let get on with the transaction')

        // const [signer] = await ethers.getSigners()
        // const contract = new ethers.Contract(SIMPLE_MULTIPLIER_ADDR, SIMPLE_MULIPLIER_ABI, signer)

        // console.log('Deployment account: ', signer.address)
        // console.log('Account balance:', (await signer.getBalance()).toString())

        // const result = await contract.submitProof(calldata[0], JSON.parse(calldata[1]))
        // console.log('ZK-Result: ', result)
        // console.log('Transaction executed succesfully !!')

        return
    } catch (err) {
        console.log(`Error:`, err)
        return {
            proof: '',
            publicSignals: [],
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

