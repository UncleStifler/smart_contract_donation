const { expect } = require("chai");
const { ethers } = require("hardhat");
require("chai").use(require("chai-bignumber")(web3.BigNumber)).should();

describe("Funding", function() {
  const ETHERS = 10**18;
  const GAS_PRICE = 10**10;

  it("minimal donation check", async () => {
    const Donations = await ethers.getContractFactory("Donations");
    const donations = await Donations.deploy();
    await donations.deployed();

    await expect(donations.Donate()).to.be.revertedWith(
        "Minimal donation is 0.001 ETH"
      );
  });

  it("make donation", async () => {
    const Donations = await ethers.getContractFactory("Donations");
    const donations = await Donations.deploy();
    await donations.deployed();

    await donations.Donate({
      value: ETHERS * 0.003,
      gasPrice: GAS_PRICE
    });
  });
});