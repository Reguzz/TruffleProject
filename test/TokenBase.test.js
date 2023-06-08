const {
  BN,
  constants,
  expectEvent,
  expectRevert,
  time,
} = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const { ZERO_ADDRESS } = constants;

const { expect } = require("chai");

const { shouldBehaveLikeERC20 } = require("./ERC20.behaviour");

const Token = artifacts.require("Token");
const Whitelist = artifacts.require("Whitelist");

const fromWei = (x) => web3.utils.fromWei(x.toString());
const toWei = (x) => web3.utils.toWei(x.toString());

contract("Token Base", function (accounts) {
  const [deployer, recipient, firstAccount, anotherAccount] = accounts;

  beforeEach(async function () {
    this.tokenWL = await Whitelist.new();
    await this.tokenWL.addToWhitelist(recipient);
    await this.tokenWL.addToWhitelist(anotherAccount);

    this.token = await Token.new("Homework1", "HW1", 1000000, this.tokenWL.address);
  });

  shouldBehaveLikeERC20(
    "ERC20",
    new BN("1000000000000000000000000"),
    deployer,
    recipient,
    anotherAccount
  );
});
