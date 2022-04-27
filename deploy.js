const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile.js')

const provider = new HDWalletProvider( 
    '<your 12 words mnemonic>',
    'https://rinkeby.infura.io/v3/c6ab737e959f4c149fcd22d1ca7aa080'
);
const web3 = new Web3(provider);


const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('The Account used for deployment',accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:JSON.parse(bytecode)})
        .send({gas:'3000000',from:accounts[0]});

    console.log('Contract deployed to address',result.options.address);
}

deploy();

/*
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Firs","outputs":[{"internalType":"string","name":"Title","type":"string"},{"internalType":"string","name":"Description","type":"string"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"address","name":"creator","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"administrator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"id","type":"string"},{"internalType":"string","name":"Title","type":"string"},{"internalType":"uint256","name":"FirID","type":"uint256"}],"name":"createEvidence","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"Title","type":"string"},{"internalType":"string","name":"Description","type":"string"},{"internalType":"uint256","name":"time","type":"uint256"}],"name":"createFir","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"police_address","type":"address"}],"name":"createPolice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"location","type":"string"}],"name":"createStation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"evidences","outputs":[{"internalType":"string","name":"Title","type":"string"},{"internalType":"string","name":"id","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numEvidence","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numFir","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"police_men","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stations","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"location","type":"string"}],"stateMutability":"view","type":"function"}]
The Account used for deployment 0xebCaB73193D6492AEF06A63b090Cce82D6290411
Contract deployed to address 0xA166953eAA0ACc86F5C9cC0168BeDB71cC390f0E

*/
