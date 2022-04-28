import { expect, use } from "chai"
import { ethers, waffle } from "hardhat"
import { prepareERC20Tokens, prepareSigners } from "./utils/prepare"

use(waffle.solidity)

describe("ERC20 mock contract", function () {
    beforeEach(async function () {
        await prepareSigners(this)
        await prepareERC20Tokens(this, this.bob)
    })

    describe("Deployment", function () {
        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await this.token1.balanceOf(this.bob.address)
            expect(await this.token1.totalSupply()).to.equal(ownerBalance)
        })
    })

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            const transferAmount = ethers.utils.parseUnits("100", 6)
            await this.token1.connect(this.bob).transfer(this.alice.address, transferAmount)

            const aliceBalance = await this.token1.balanceOf(this.alice.address)
            expect(aliceBalance).to.equal(transferAmount)
        })

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const initialOwnerBalance = await this.token1.balanceOf(this.bob.address)
            await expect(this.token1.connect(this.misha).transfer(this.bob.address, 1)).to.be.revertedWith(
                "ERC20: transfer amount exceeds balance"
            )

            // Owner balance shouldn't have changed.
            expect(await this.token1.balanceOf(this.bob.address)).to.equal(initialOwnerBalance)
        })

        it("Should update balances after transfers", async function () {
            const initialOwnerBalance = await this.token1.balanceOf(this.bob.address)

            const transferToMishaAmount = ethers.utils.parseUnits("100", 6)
            await this.token1.connect(this.bob).transfer(this.misha.address, transferToMishaAmount)

            const transferToTemaAmount = ethers.utils.parseUnits("100", 6)
            await this.token1.connect(this.bob).transfer(this.tema.address, transferToTemaAmount)

            const finalOwnerBalance = await this.token1.balanceOf(this.bob.address)
            expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(transferToTemaAmount).sub(transferToMishaAmount))

            const mishaBalance = await this.token1.balanceOf(this.misha.address)
            expect(mishaBalance).to.equal(transferToMishaAmount)

            const temaBalance = await this.token1.balanceOf(this.tema.address)
            expect(temaBalance).to.equal(transferToTemaAmount)
        })
    })
})
