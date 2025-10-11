import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

import {
  token1,
  token2,
  pool,
  token1Abi,
  token2Abi,
  poolAbi,
} from "./Constants/constants";

import Login from "./Components/Login";
import Connected from "./Components/Connected";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [token1Supply, setToken1Supply] = useState();
  const [token2Supply, setToken2Supply] = useState();
  const [poolReserve1, setPoolReserve1] = useState();
  const [poolReserve2, setPoolReserve2] = useState();

  const dec = 10 ** 18;

  useEffect(() => {
    getTokenSupply();
    getPoolReserves();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  });

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function getEssentials() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const token1Instance = new ethers.Contract(token1, token1Abi, signer);
    const token2Instance = new ethers.Contract(token2, token2Abi, signer);
    const poolInstance = new ethers.Contract(pool, poolAbi, signer);

    return { token1Instance, token2Instance, poolInstance };
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask connected: " + address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }

  async function convert_18dec(amt) {
    return await ethers.utils.formatUnits(amt, 18);
  }

  async function getTokenSupply() {
    const { token1Instance, token2Instance } = await getEssentials();

    const token1_supply = await token1Instance.totalSupply();
    const token2_supply = await token2Instance.totalSupply();

    console.log(await convert_18dec(token1_supply));
    console.log(await convert_18dec(token2_supply));

    setToken1Supply(await convert_18dec(token1_supply));
    setToken2Supply(await convert_18dec(token2_supply));
  }

  async function getPoolReserves() {
    const { poolInstance } = await getEssentials();

    const reserve1 = await poolInstance.reserve1();
    const reserve2 = await poolInstance.reserve2();

    setPoolReserve1(await convert_18dec(reserve1));
    setPoolReserve2(await convert_18dec(reserve2));
  }

  async function mintToken1(recipient, amt) {
    const { token1Instance } = await getEssentials();
    await token1Instance.mint(recipient, ethers.utils.parseUnits(amt, 18));
    console.log("TOKEN1 MINTING SUCCESSFULL: ", amt);
  }

  async function deposit_token1(amt) {
    const { token1Instance, poolInstance } = await getEssentials();

    await token1Instance.approve(pool, ethers.utils.parseUnits(amt, 18));
    await poolInstance.provide_token1(ethers.utils.parseUnits(amt, 18));

    console.log("TOKEN1 LIQUIDITY: DEPOSITED");
  }

  async function swap_token2(amt) {
    const { token2Instance, poolInstance } = await getEssentials();

    await token2Instance.approve(pool, ethers.utils.parseUnits(amt, 18));
    await poolInstance.swapToken2(ethers.utils.parseUnits(amt, 18));

    console.log("TOKEN2 SWAPPED");
  }

  return (
    <div className="App">
      {isConnected ? (
        <Connected
          account={account}
          token1Supply={token1Supply}
          token2Supply={token2Supply}
          poolReserve1={poolReserve1}
          poolReserve2={poolReserve2}
          mintToken1={mintToken1}
          deposit_token1={deposit_token1}
          swap_token2={swap_token2}
        />
      ) : (
        <Login connectWallet={connectToMetamask} />
      )}
    </div>
  );
}

export default App;
