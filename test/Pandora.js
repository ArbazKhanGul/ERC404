const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pandora Contract", function () {
  let Pandora;
  let pandora;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Pandora = await ethers.getContractFactory("Pandora");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new Pandora contract for each test
    pandora = await Pandora.deploy(owner.address);
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Assuming the owner starts with all tokens; transferring 50 tokens from owner to addr1
      await pandora.transfer(addr1.address, ethers.parseEther('1'));
      const addr1Balance = await pandora.balanceOf(addr1.address);
      expect(addr1Balance.toString()).to.equal(ethers.parseEther('1'));

      // Transfer 25 tokens from addr1 to addr2 (need to send transaction as addr1)
      await pandora.connect(addr1).transfer(addr2.address, ethers.parseEther('1'));
      const addr2Balance = await pandora.balanceOf(addr2.address);
      expect(addr2Balance.toString()).to.equal(ethers.parseEther('1'));
    });
  });
});
