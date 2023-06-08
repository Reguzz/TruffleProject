// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./SimpleStorage.sol";

contract ComplexStorage is SimpleStorage{

  SimpleStorage SSTO;
  constructor() {}

  function recall() public view {
    SSTO.get();
  }

  function changeRemoteValue(uint _newVal) public {
    SSTO.set(_newVal);
  }

}
