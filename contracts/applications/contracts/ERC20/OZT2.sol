// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OZT2 is ERC20 {
    uint dec = 10 ** 18;
    constructor() ERC20("OZT2", "OZT2") {
        uint amount = 1000 * dec;
        _mint(msg.sender, amount);
    }

    function mint(address recipient, uint amount) external {
        _mint(recipient, amount);
    }
}
