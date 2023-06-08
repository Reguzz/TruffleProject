// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWhitelist.sol";
contract Whitelist is Ownable, IWhitelist {
  
  mapping(address => bool) public wlMembers;
  uint256 public wlLength;

  constructor() {
    addToWhitelist(msg.sender);
  }

  function isWhitelisted(address _member) public view override returns (bool){
    return wlMembers[_member];
  }

  function addToWhitelist(address _member) public onlyOwner {
    require(_member != address(0), "Address not allowed");
    wlMembers[_member] = true;
    wlLength ++;
  }

  function removeToWhitelist(address _member) public onlyOwner {
    require(isWhitelisted(_member), "Address not whitelisted");
    wlMembers[_member] = false;
    wlLength --;
  }

  function getWLLength() external view override returns (uint256) {
    return wlLength;
  }
}
