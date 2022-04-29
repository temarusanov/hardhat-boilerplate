# Hardhat solidity boilerplate

This repository contains a template that you can use to develop smart contracts on Solidity. It use hardhat and hardhat plugins. Feel free to contribute this repo


## Features

- Customized hardhat config
- Handy compilied dir (`/build`) with deployments, abis, artifacts and typechain 
- Fully typed tests with examples
- Mocha gas reporter plugin
- Hardhat deploy plugin
- One-command verifier (etherscan-verify)
- Examples for deploy, tasks and tests

## What’s Included?

Your environment will have everything you need to build a Dapp powered by Hardhat and React.

- [Hardhat](https://hardhat.org/): An Ethereum development task runner and testing network.
- [Mocha](https://mochajs.org/): A JavaScript test runner.
- [Chai](https://www.chaijs.com/): A JavaScript assertion library.
- [Ethers.js](https://docs.ethers.io/v5/): A JavaScript library for interacting with Ethereum.
- [Waffle](https://github.com/EthWorks/Waffle/): To have Ethereum-specific Chai assertions/mathers.
- [Mocha gas reporter](https://github.com/cgewecke/eth-gas-reporter): A Mocha reporter for Ethereum test suites
- [Hardhat deploy](https://github.com/wighawag/hardhat-deploy): A hardhat plugin for replicable deployments and easy testing

## TODO

- [ ] Solhint

## Installation

```bash
$ nvm use && yarn install
```

## Quick start

### Deploy

Use this command to deploy your contracts from `/deploy` dir

```
$ npx hardhat deploy 
```

- `--network <network>`. Select network to deploy
- `--reset`. This flag resets the deployments from scratch. Previously deployed contract are not considered and deleted from disk.
- `--tags <tag1> <tag2>`. Only excute deploy scripts with the given tags (separated by commas) and their dependencies

More about options you can read [here](https://github.com/wighawag/hardhat-deploy#1-hardhat-deploy)

### Verify

This task will submit the contract source and other info of all deployed contracts to allow etherscan to verify and record the sources.

```
$ npx hardhat etherscan-verify --solc-input
```

More about options you can read [here](https://github.com/wighawag/hardhat-deploy#4-hardhat-etherscan-verify)


### Export

This task will export the contract deployed (saved in `deployments` folder) to a file with a simple format containing only contract addresses and abi, useful for web apps.

```
$ npx hardhat --network <network> export --export deployments/<network>.json
```

More about options you can read [here](https://github.com/wighawag/hardhat-deploy#6-hardhat-export)

### Testing

Run tests for your smart contracts. Boilerplate offers you fully typed test through Mocha context redeclare. With `mocha.context.d.ts` you can types all your contracts, variables and then use it with your context.

```
$ npx hardhat test <test_path>
```

```ts
// example in tests/ERC20Mock.test.ts
it("Should transfer tokens between accounts", async function () {
    const transferAmount = ethers.utils.parseUnits("100", 6)
    // this.token1 type is ERC20Mock
    // this.bob type is SignerWithAddress
    await this.token1.connect(this.bob).transfer(this.alice.address, transferAmount)

    const aliceBalance = await this.token1.balanceOf(this.alice.address)
    expect(aliceBalance).to.equal(transferAmount)
})
```

Use gas reporter to get actual transaction fee for your Mocha tests

```bash
# Get free CMC api key
COINMARKETCAP_API_KEY=
# Enable/Disable gas reposter
REPORT_GAS=false
# Paste blockchain native token name
TOKEN=AVAX
# Gas price api if you use not Ethereum blockchain
GAS_PRICE_API=https://api.snowtrace.io/api?module=proxy&action=eth_gasPrice
```

Read about gas reposter more [here](https://github.com/cgewecke/eth-gas-reporter)
