// var SimpleStorage = artifacts.require("SimpleStorage");
// var ComplexStorage = artifacts.require("ComplexStorage");
const Token = artifacts.require("Token");
const Whitelist = artifacts.require("Whitelist");

module.exports = async(deployer, network, accounts) => {
  if (network == "development") {

    await deployer.deploy(Whitelist);
    const wl = await Whitelist.deployed();
    console.log("Deployed WL is @:", wl.address);

    await deployer.deploy(Token, "Homework1", "HW1", 1000000, wl.address)
    
    const token = await Token.deployed();
    console.log("Deployed token is @:", token.address);
  }
}