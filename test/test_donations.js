const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Funding", function() {
  const ETHERS = 10**18;
  const GAS_PRICE = 10**10;

  const numOfDonates = 2;

  const deployContract = async () => {
    const Donations = await ethers.getContractFactory("Donations");
    const donations = await Donations.deploy();

    return donations.deployed();
  }

  const getContractBalance = async (contract) => {
    return web3.eth.getBalance(contract.address);
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
    const signers = await ethers.getSigners();

    let startBalance = await getContractBalance(contract);

    expect(startBalance).to.be.eq('0');

    let expectedBalance = 0;
    for(var i = 0; i < numOfDonates; i++){
      await contract.connect(signers[i]).Donate({
        value: ETHERS * 0.003 * (i+1),
        gasPrice: GAS_PRICE
      });

      expectedBalance += ETHERS * 0.003 * (i+1);
    }

    const endBalance = await getContractBalance(contract);

    expect(endBalance).to.be.eq('' + expectedBalance);
  });

  // it("check contract has donators addresses", async () => {
  //   var length = contract.getDonatorsLength();

  //   let donator;

  //   for(var i = 0; i < length; i++){
  //     donator = await contract.getDonatorByIndex(i+10);
  //     signer = signers[i].getAddress()

  //     expect(donator).to.be.eq(signer);
  //   }
  // });

  it("transfer donations from contract", async () => {
    let startContrBalance = await getContractBalance(contract);
    expect(startContrBalance).to.not.be.eq('0');

    await contract.transferDonates();

    let endcontractBalance = await getContractBalance(contract);
    expect(endcontractBalance).to.be.eq('0');
  });
});
