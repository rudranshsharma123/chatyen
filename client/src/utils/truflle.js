import Web3 from 'web3';
import Chatyen from '../contracts/Chatayen.json'
// import contract from '@truffle/contract';
// var contract = require('@truffle/contract')

export const getWeb3 = async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            return web3;
        } catch (error) {
            console.log(error);
        }
    }
    if (window.web3) {
        return new Web3(window.web3.currentProvider);
    }
    return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
};

// const getContract = async (web3) => {

// //     const contractc = contract(Chatyen);
// //     contract.setProvider(web3.currentProvider);
// //     return contract;
// // };
