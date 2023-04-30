import React, { useState, useEffect } from "react";
import { getWeb3 } from "./utils/truflle";
import Web3 from "web3";
import Chatyen from "./contracts/Chatayen.json";
import Album from "./components/Album";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    // this.setState({ account: accounts[0] });
    setAccount(accounts[0]);
    // this.setState({ web3: web3 });
    setWeb3(web3);
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Chatyen.networks[networkId];
    if (networkData) {
      setContract(new web3.eth.Contract(Chatyen.abi, networkData.address));
    }
    console.log(networkData);
  };
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
  };
  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  }, []);

  const addChatbot = async (
    name,
    desc,
    buyPrice,
    leasePrice,
    leaseDuration,
    link,
  ) => {
    await contract.methods
      .addChatbot(name, desc, buyPrice, leasePrice, leaseDuration, link)
      .send({ from: account, value: web3.utils.toWei("1", "ether"), gas: 3000000, })
      .then((res) => {
        return res;
      });
  };
  const buyChatBot = async (chatBotID) => {
    await contract.methods.buyChatbot(chatBotID).send({
      from: account, value: web3.utils.toWei("2", "ether"), gas: 3000000,
    })
      .then((res) => { return res; });
  }

  const checkAccessToBot = async (chatBotID) => {
    console.log(account);
    await contract.methods.confirmAccess(chatBotID).call({ from: account }).then((res) => { return res })
  }

  const getAllChatBots = async () => {
    const k = await contract.methods.getChatbots().call().then((res) => { return res })
    console.log(k)

  }

  const checkLeaseAccess = async (chatBotID) => {
    const res = await contract.methods.checkAccess(chatBotID).send({ from: account, gas: 30000 }).then((res) => { return res })
    console.log(res)
  }


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
      <button
        onClick={async () => {
          console.log(account);
          // await addChatbot("lol", "lol", 2, 2, 19, "lol");
          // await buyChatBot(0);
          // console.log(account)
          await checkAccessToBot(0);
          await getAllChatBots();

        }}>
        Call My Function
      </button>
      <Album />
      {/* <PopUpModal /> */}
    </div>
  );
}

export default App;
