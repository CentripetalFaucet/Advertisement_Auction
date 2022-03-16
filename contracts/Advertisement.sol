pragma solidity ^0.8.0;

contract Advertisement {
    // Default data is IPFS hash to keep consistent with standard program use.
    string private image_url = "QmbLEbwDMauqqJ7Vq2435epVb126VQbxRRgPjWrFozmNSH";
    string private text = "QmfPtUL6vBVDQtH7j3xXBHCUc9QRWb8N8s7BoajrBq23hA";
    uint private price = 0;

    function updateAdvertisement(string memory new_image, string memory new_text) public payable {
        require(msg.value > price, "Payment must be greater than the listed price");
        
        image_url = new_image;
        text = new_text;
        price = msg.value;
    }

    function getAdvertisement() public view returns(string memory, string memory, uint) {
        return (image_url, text, price);
    }
}