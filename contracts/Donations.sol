// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donations {
  address payable public owner;
  mapping(address => uint) public donations;
  
  constructor() {
    owner = payable(msg.sender);
  }

  function donate() public payable {
    // Make donation
    if(!inDonaters(msg.sender)){
      donations[msg.sender] = msg.value;
    }
    else{
      donations[msg.sender] += msg.value;
    }
  }

  function transfer(address payable _addr, uint _amount) external {
    // Transfer donates ONLY to contract owner
    require(msg.sender == owner, "You have no permission to get donates");
    _addr.transfer(_amount);
  }

  function inDonaters(address _addr) public view returns(bool) {
    // If donater have already donated, returns TRUE
    return donations[_addr] > 0;
  }

  function getDonates(address _addr) public view returns(uint) {
    // to get total amount of donates by address
    return donations[_addr];
  }
}
