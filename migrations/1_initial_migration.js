const Migrations = artifacts.require("Chatayen");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
