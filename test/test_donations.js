const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Funding", function() {
  const ETHERS = 10**18;
  const GAS_PRICE = 10**10;

  const deployContract = async () => {
    const Donations = await ethers.getContractFactory("Donations");
    const donations = await Donations.deploy();

    return donations.deployed();
  }

  it("deploy contract", async () => {
    contract = await deployContract();
  });

  it("minimal donation check", async () => {
    await expect(contract.Donate()).to.be.revertedWith(
        "Minimal donation is 0.001 ETH"
      );
  });

  it("make donations from different accounts", async () => {
    const numOfDonates = 2;
    const signers = await ethers.getSigners();

    let startBalance = await web3.eth.getBalance(contract.address);

    expect(startBalance).to.be.eq('0');

    expectedBalance = 0;
    for(var i = 0; i < numOfDonates; i++){
      await contract.connect(signers[i]).Donate({
        value: ETHERS * 0.003 * (i+1),
        gasPrice: GAS_PRICE
      });

      expectedBalance += ETHERS * 0.003 * (i+1);
    }

    let endtBalance = await web3.eth.getBalance(contract.address);

    expect(endtBalance).to.be.eq('' + expectedBalance);
  });

  it("check contract has donators addresses", async () => {
    var length = contract.getDonatorsLength();

    for(var i = 0; i < length; i++){
      expect(contract.getDonatorByIndex(i)).to.be.eq(addrs[i]);
    }
  });
});
