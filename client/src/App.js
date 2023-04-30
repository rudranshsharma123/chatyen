import React, { useState, useEffect } from 'react';
import { getWeb3 } from './utils/truflle';
import Web3 from 'web3'
import Chatyen from './contracts/Chatayen.json'
function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null)


  // const [contract, setContract] = useState(null);



  // const handleClick = async () => {
  //   const accounts = await web3.eth.getAccounts();
  //   const result = await contract.myFunction({ from: accounts[0] });
  //   console.log(result);
  // };
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    // this.setState({ account: accounts[0] });
    setAccount(accounts[0])
    // this.setState({ web3: web3 });
    setWeb3(web3)
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Chatyen.networks[networkId];
    if (networkData) {
      setContract(
        new web3.eth.Contract(Chatyen.abi, networkData.address)
      )

    }
    console.log(networkData);

  }
  const loadWeb3 = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!",
      );
    }
  }
  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });

  }, [])

  useEffect(() => {
    const init = async () => {
      await loadWeb3();
      await loadBlockchainData();

      // setWeb3(web3Instance);
      // setContract(contractInstance);
    };
    init();
  }, []);
  return (
    <div>
      <button onClick={() => { console.log(account) }}>Call My Function</button>
    </div>
  );
}

export default App;
