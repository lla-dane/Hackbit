import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Liquidity Pool", function () {
  async function deployPoolFixture() {
    const [owner, addr1] = await ethers.getSigners();

    // Mint ERC20 tokens
    const Token1 = await ethers.getContractFactory("OZT1");
    const Token2 = await ethers.getContractFactory("OZT1");
    const token1 = await Token1.deploy();

    const token2 = await Token2.deploy();

    const Pool = await ethers.getContractFactory("LiquidityPool");
    const pool = await Pool.deploy(token1.getAddress(), token2.getAddress());

    return { token1, token2, pool, owner, addr1 };
  }

  describe("Deployment", function () {
    it("Mint new tokens to an address and then PROVIDE/WITHDRAW liquidity from that address", async function () {
      const { token1, token2, pool, addr1 } = await loadFixture(
        deployPoolFixture
      );

      await token2.mint(addr1.address, ethers.parseUnits("1000", 18));

      // PROVIDE LIQUIDITY

      expect(await token2.balanceOf(addr1.address)).to.equal(
        ethers.parseUnits("1000", 18)
      );

      await token2
        .connect(addr1)
        .approve(pool.getAddress(), ethers.parseUnits("1000", 18));

      console.log(await token1.totalSupply());

      await pool.connect(addr1).provide_token2(ethers.parseUnits("100", 18));

      expect(await pool.reserve2()).to.equal(ethers.parseUnits("100", 18));

      // WITHDRAW LIQUIDITY

      await pool.connect(addr1).withdraw_token2(ethers.parseUnits("45", 18));

      expect(await pool.reserve2()).to.equal(ethers.parseUnits("55", 18));
    });

    it("Swap between token1 and token2", async function () {
      const { token1, token2, pool, owner, addr1 } = await loadFixture(
        deployPoolFixture
      );

      // MINT AND PROVIDE LIQ FOR TOKEN2 (ADDR1)
      await token2
        .connect(addr1)
        .mint(addr1.address, ethers.parseUnits("1000", 18));

      await token2
        .connect(addr1)
        .approve(await pool.getAddress(), ethers.parseUnits("500", 18));

      await pool.connect(addr1).provide_token2(ethers.parseUnits("100", 18));

      await token1.approve(pool.getAddress(), ethers.parseUnits("100", 18));

      await pool.swapToken1(ethers.parseUnits("50", 18));

      // SWAP HAPPENED BETWEEN TOKEN1 AND TOKEN2 FOR (OWNER)

      expect(await token2.balanceOf(owner.address)).to.equal(
        ethers.parseUnits("1050", 18)
      );
    });
  });
});
