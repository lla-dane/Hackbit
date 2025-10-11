const SIMPLE_MULIPLIER_ABI = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'plonkVerifierAddress',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'bool',
                name: 'result',
                type: 'bool',
            },
        ],
        name: 'ProofResult',
        type: 'event',
    },
    {
        inputs: [],
        name: 's_plonkVerifierAddress',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes',
                name: 'proof',
                type: 'bytes',
            },
            {
                internalType: 'uint256[]',
                name: 'pubSignals',
                type: 'uint256[]',
            },
        ],
        name: 'submitProof',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
]

export { SIMPLE_MULIPLIER_ABI }
