// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donations {
  address payable public owner;
  address[] public donators;
  mapping(address => uint) public donations;

  constructor() {
    owner = payable(msg.sender);
  }

  function Donate() public payable {
    // Make donation
    require(msg.value > .001 ether, "Minimal donation is 0.001 ETH");

    if(!inDonaters(msg.sender)){
      donators.push(msg.sender);
      donations[msg.sender] = msg.value;
    }
    else{
      donations[msg.sender] += msg.value;
    }
  }

  function transferDonates() external {
    // Transfer donates ONLY to contract owner
    require(msg.sender == owner, "You have no permission to get donates");
    owner.transfer(address(this).balance);
  }

  function inDonaters(address sender) private view returns(bool) {
    // If donater have already donated, returns TRUE
    bool flag = false;

    for(uint i = 0; i < donators.length; i++){
      if(donators[i] == sender) flag = true;
    }

    return flag;
  }

  function getDonatorsLength() public view returns(uint) {
    return donators.length;
  }

  function getDonatorByIndex(uint index) public view returns(address) {
    require(index < donators.length, "Index is out of range");
    return donators[index];
  }
}
