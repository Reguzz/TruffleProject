// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IWhitelist.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {

  address private wlContractAddress;
  constructor(string memory _tokenName, string memory _tokenSymbol, uint256 _supply, address _wlAddress) ERC20(_tokenName, _tokenSymbol) {
    // _mint(msg.sender,1000000*10**18);
    require(_wlAddress != address(0), "Address not allowed");
    wlContractAddress = _wlAddress;
    _mint(msg.sender, _supply*10**18);
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
    // require(IWhitelist(wlContractAddress).isWhitelisted(from), "sender not whitelisted");
    require(to != address(0), "Tokens cannot be sent at Zero address");
    require(IWhitelist(wlContractAddress).isWhitelisted(to), "receiver not whitelisted");

    super._beforeTokenTransfer(from, to, amount);
  }

  function setWLContractAddress(address _wlAddress) external onlyOwner {
    require(_wlAddress != address(0), "Address not allowed");
    wlContractAddress = _wlAddress;
  }
}
