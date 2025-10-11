// import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

// import { expect } from "chai";
// import { ethers } from "hardhat";

// describe("ERC20", function () {
//   async function deployERC20Fixture() {
//     const [owner, addr1, addr2] = await ethers.getSigners();
//     const MyToken = await ethers.getContractFactory("MyToken");
//     const token = await MyToken.deploy("ERC125", "E125", 18);

//     return { token, owner, addr1, addr2 };
//   }

//   describe("Deployment", async function () {
//     const { token, owner, addr1, addr2 } = await loadFixture(
//       deployERC20Fixture
//     );

//     it("Should return the right Token", async function () {
//       expect(await token.name()).to.equal("ERC125");
//       expect(await token.decimals()).to.equal(18);
//     });

//     it("Should mint 100 tokens to the owner", async function () {
//       const ownerBalance = await token.balanceOf(owner.address);
//       expect(ownerBalance).to.equal(ethers.parseUnits("100", 18));
//     });
//   });

//   describe("Transactions", function () {
//     it("Should transfer tokens between acounts", async function () {
//       const { token, owner, addr1, addr2 } = await loadFixture(
//         deployERC20Fixture
//       );

//       await token
//         .connect(owner)
//         .transfer(addr1.address, ethers.parseUnits("20", 18));
//       const addr1Balance = await token.balanceOf(addr1.address);
//       expect(addr1Balance).to.equal(ethers.parseUnits("20", 18));
//     });

//     it("Should handle approved transactions", async function () {
//       const { token, owner, addr1, addr2 } = await loadFixture(
//         deployERC20Fixture
//       );

//       let amount = await ethers.parseUnits("56", 18);
//       await token.approve(addr1.address, amount);
//       await token
//         .connect(addr1)
//         .transferFrom(owner.address, addr2.address, amount);

//       expect(await token.balanceOf(addr2.address)).to.equal(
//         ethers.parseUnits("56", 18)
//       );
//     });
//   });

//   describe("Burning and Minting", async function () {
//     it("Should burn 72 tokens from the owner' account", async function () {
//       const { token, owner, addr1, addr2 } = await loadFixture(
//         deployERC20Fixture
//       );

//       // console.log("Owner balance: ", await token.balanceOf(owner.address));

//       await token.burn(owner.address, ethers.parseUnits("72", 18));
//       expect(await token.balanceOf(owner.address)).to.equal(
//         ethers.parseUnits("28", 18)
//       );
//     });

//     it("Should mint 43 tokens to the owner' account", async function () {
//       const { token, owner, addr1, addr2 } = await loadFixture(
//         deployERC20Fixture
//       );

//       await token.mint(owner.address, ethers.parseUnits("43", 18));
//       expect(await token.balanceOf(owner.address)).to.equal(
//         ethers.parseUnits("143", 18)
//       );
//     });
//   });
// });
