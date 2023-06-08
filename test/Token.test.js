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

const Token = artifacts.require("Token");
const Whitelist = artifacts.require("Whitelist");

const fromWei = (x) => web3.utils.fromWei(x.toString());
const toWei = (x) => web3.utils.toWei(x.toString());

contract("Token", function (accounts) {
  const [deployer, recipient, firstAccount, anotherAccount] = accounts;

  it("retrive deployed contract", async function () {
    this.tokenWL = await Whitelist.deployed();
    expect(this.tokenWL.address).to.be.not.equal(ZERO_ADDRESS);
    expect(this.tokenWL.address).to.match(/0x[0-9a-fA-F]{40}/);

    this.token = await Token.deployed();
    expect(this.token.address).to.be.not.equal(ZERO_ADDRESS);
    expect(this.token.address).to.match(/0x[0-9a-fA-F]{40}/);
  });

  it("whitelisting accounts (deployer)", async function () {
    await this.tokenWL.addToWhitelist(recipient, { from: deployer });
    await this.tokenWL.addToWhitelist(anotherAccount, { from: deployer });
  });

  it("transfer some tokens from deployer to other", async function () {
    await this.token.transfer(recipient, toWei(200000), { from: deployer });
    await this.token.transfer(anotherAccount, toWei(100000), {
      from: deployer, 
    });

    expect((await this.token.balanceOf(deployer)).toString()).to.be.equal(toWei(700000).toString());
    expect((await this.token.balanceOf(recipient)).toString()).to.be.equal(toWei(200000).toString());
    expect((await this.token.balanceOf(anotherAccount)).toString()).to.be.equal(toWei(100000).toString());
  });


});
