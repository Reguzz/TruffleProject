// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SimpleStorage {
  uint public x;
  constructor() {
    x = 1;
  }

  function set(uint newValue) public {
    x = newValue;
  }

  function get() public view returns(uint){
    return x;
  }
}
