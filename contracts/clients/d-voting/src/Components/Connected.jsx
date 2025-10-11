import React from "react";
import { useState } from "react";

const Connected = (props) => {
  const [candidateName, setCandidate] = useState("");

  const handleAddCandidate = () => {
    props.addCandidate(candidateName);
    setCandidate("");
  };

  return (
    <div>
      <h1>You are connected to Metamask</h1>
      <p>METAMASK ACCOUNT = {props.account} </p>
      <p>REMAINING TIME: {props.remainingTime} </p>
      <p>REMAINING TIME: {props.candidates[4].name} </p>

      <div>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidate(e.target.value)}
          placeholder="ENTER CANDIDATE"
        />
        <button onClick={handleAddCandidate}>Add Candidate</button>
      </div>
    </div>
  );
};

export default Connected;
