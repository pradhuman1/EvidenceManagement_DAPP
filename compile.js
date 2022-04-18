const path = require('path');
const fs = require('fs');
const solc = require('solc')


const evidencePath = path.resolve(__dirname,'contracts/Evidence.sol');
const source = fs.readFileSync(evidencePath,'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'Evidence.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

const output =JSON.parse(solc.compile(JSON.stringify(input)));
const interface = JSON.stringify(output.contracts["Evidence.sol"].evidence.abi);
const bytecode = JSON.stringify(output.contracts["Evidence.sol"].evidence.evm.bytecode.object);

console.log(interface);


module.exports = {interface,bytecode}