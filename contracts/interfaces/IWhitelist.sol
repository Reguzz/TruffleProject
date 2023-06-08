// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
interface IWhitelist {
  function isWhitelisted(address _member) external view returns (bool);
  function getWLLength() external view returns (uint256);
}