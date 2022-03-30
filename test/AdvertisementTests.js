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
        let instance = await Advertisement.deployed();

        let advertisementValues = await instance.getAdvertisement();
        let price = advertisementValues["2"];
        const newText = "Test text"
        const newImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
        const expectedError = "Payment must be greater than the listed price"

        // Check when message value is below price
        try {            
            let result = await instance.updateAdvertisement(newImageUrl, newText, {from: mainAccount, value: price-1});
            expect.fail("Advertisement was successfully updated despite message value not being sufficient.")
        } 
        catch (error) {
            expect(error["reason"]).to.be.a('string').equal(expectedError, "Outputted incorrect error: " + error["reason"])
        }

        // Check when message value is equal to price
        try {            
            let result = await instance.updateAdvertisement(newImageUrl, newText, {from: mainAccount, value: price});
            expect.fail("Advertisement was successfully updated despite message value not being sufficient.")
        } 
        catch (error) {
            expect(error["reason"]).to.be.a('string').equal(expectedError, "Outputted incorrect error: " + error["reason"])
        }
        
    });

    it("Updating advertisement correctly sets attributes to the new values", async() => {
        let instance = await Advertisement.deployed();
        let advertisementValues = await instance.getAdvertisement();
        let price = advertisementValues["2"];

        

        expect.fail("Incomplete test");
    });

    it("Updating advertisement a second time requires increased price", async() => {
        expect.fail("Incomplete test");
    });

    it("Updating advertisement twice at once cancels one transaction", async() => {
        expect.fail("Incomplete test");
    });
})