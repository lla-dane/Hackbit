// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LiquidityPool {
    IERC20 public token1;
    IERC20 public token2;
    uint public reserve1 = 0;
    uint public reserve2 = 0;

    uint public priceRatio = 1;

    mapping(address => mapping(IERC20 => uint)) public liquidity;

    constructor(address _token1, address _token2) {
        token1 = IERC20(_token1);
        token2 = IERC20(_token2);
    }

    function provide_token1(uint amount1) external {
        token1.transferFrom(msg.sender, address(this), amount1);
        reserve1 += amount1;
        liquidity[msg.sender][token1] += amount1;
    }

    function provide_token2(uint amount2) external {
        token2.transferFrom(msg.sender, address(this), amount2);
        reserve2 += amount2;
        liquidity[msg.sender][token2] += amount2;
    }

    function withdraw_token1(uint amount) external {
        require(liquidity[msg.sender][token1] >= amount);
        token1.transfer(msg.sender, amount);
        reserve1 -= amount;
        liquidity[msg.sender][token1] -= amount;
    }

    function withdraw_token2(uint amount) external {
        require(liquidity[msg.sender][token2] >= amount);
        token2.transfer(msg.sender, amount);
        reserve2 -= amount;
        liquidity[msg.sender][token2] -= amount;
    }

    function swapToken1(uint amount1In) external {
        require(amount1In > 0, "Invalid amount");
        uint amount2Out = amount1In / priceRatio;
        require(amount2Out <= reserve2, "Insufficient liquidity");
        token1.transferFrom(msg.sender, address(this), amount1In);
        token2.transfer(msg.sender, amount2Out);
        reserve1 += amount1In;
        reserve2 -= amount2Out;
    }

    function swapToken2(uint amount2In) external {
        require(amount2In > 0, "Invalid amount");
        uint amount1Out = amount2In / priceRatio;
        require(amount1Out <= reserve1, "Insuffient liquidity");
        token2.transferFrom(msg.sender, address(this), amount2In);
        token1.transfer(msg.sender, amount1Out);
        reserve2 += amount2In;
        reserve1 -= amount1Out;
    }
}
