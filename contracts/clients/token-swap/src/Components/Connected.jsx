import React from "react";
import { useState } from "react";

const Connected = (props) => {
  const [token1_mint_amt, setToken1_mint_amt] = useState("");
  const [token1_mint_recipient, setToken1_mint_recipient] = useState("");
  const [token2_mint_amt, setToken2_mint_amt] = useState("");
  const [token2_mint_recipient, setToken2_mint_recipient] = useState("");

  const [token1_liq_amt, setToken1_liq_amt] = useState("");
  const [token2_liq_amt, setToken2_liq_amt] = useState("");

  const [token1_swap_amt, setToken1_swap_amt] = useState("");
  const [token2_swap_amt, setToken2_swap_amt] = useState("");

  const handleToken1_mint = () => {
    props.mintToken1(token1_mint_recipient, token1_mint_amt);
    setToken1_mint_amt("");
    setToken1_mint_recipient("");
  };

  const handleToken1_deposit = () => {
    props.deposit_token1(token1_liq_amt);
    setToken1_liq_amt("");
  };

  const handleToken2_swap = () => {
    props.swap_token2(token2_swap_amt);
    setToken2_swap_amt("");
  };

  return (
    <div>
      <h2>You are connected to Metamask</h2>
      <p>{props.account} </p>
      <p>OZT1 = {props.token1Supply} </p>
      <p>OZT2 = {props.token2Supply} </p>
      <p>Pool token1 = {props.poolReserve1} </p>
      <p>Pool token2 = {props.poolReserve2} </p>
      <div>
        <div>
          <div>
            <h3>Mint OZT1</h3>
            <input
              type="text"
              value={token1_mint_recipient}
              onChange={(e) => setToken1_mint_recipient(e.target.value)}
              placeholder="Recipient address..."
            />
          </div>
          <div>
            <input
              type="text"
              value={token1_mint_amt}
              onChange={(e) => setToken1_mint_amt(e.target.value)}
              placeholder="Amount..."
            />
          </div>
          <button onClick={handleToken1_mint}>Mint</button>
        </div>
      </div>
      <div>
        <div>
          <h3>Provide OZT1 liquidity</h3>
          <input
            type="text"
            value={token1_liq_amt}
            onChange={(e) => setToken1_liq_amt(e.target.value)}
            placeholder="OZT1"
          />
        </div>
        <button onClick={handleToken1_deposit}>Deposit</button>
      </div>
      <div>
        <div>
          <h3>Swap Token2</h3>
          <input
            type="text"
            value={token2_swap_amt}
            onChange={(e) => setToken2_swap_amt(e.target.value)}
            placeholder="OZT2"
          />
        </div>
        <button onClick={handleToken2_swap}>Swap</button>
      </div>
    </div>
  );
};

export default Connected;
