const Advertisement = artifacts.require("./Advertisement.sol");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Advertisement", async(accounts) => {
    const [mainAccount, secondAccount] = accounts;

    it ("Default values are the set IPFS hashes and price of zero", async() => {
        let instance = await Advertisement.deployed();

        const expectedImageURL = "QmbLEbwDMauqqJ7Vq2435epVb126VQbxRRgPjWrFozmNSH";
        const expectedText = "QmfPtUL6vBVDQtH7j3xXBHCUc9QRWb8N8s7BoajrBq23hA";
        const expectedPrice = 0;

        let advertisementValues = await instance.getAdvertisement();
        
        expect(advertisementValues["0"]).to.be.a('string').equal(expectedImageURL);
        expect(advertisementValues["1"]).to.be.a('string').equal(expectedText);
        expect(advertisementValues["2"]).to.be.a.bignumber.equal(new BN(expectedPrice));
    });

    it("Cannot update advertisement if transaction value is at or below listed price", async() => {
    });

    it("Updating advertisement correctly sets attributes to the new values", async() => {
    });

    it("Updating advertisement a second time requires increased price", async() => {
    });

    it("Updating advertisement twice at once cancels one transaction", async() => {
    });
})