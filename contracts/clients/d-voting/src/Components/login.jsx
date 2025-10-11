import React from "react";

const Login = (props) => {
  return (
    <div>
      <h1>Welocome to DECENTRALISED VOTING PLATFORM</h1>
      <button onClick={props.connectWallet}>Login Metamask</button>
    </div>
  );
};

export default Login;
