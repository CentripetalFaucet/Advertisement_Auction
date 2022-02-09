pragma solidity ^0.8.0;

contract Advertisement {
    string private image_url = "https://via.placeholder.com/150";
    string private text = "Placeholder text";
    uint private price = 0; // First user can upload their image for free (+gas);

    function updateAdvertisement(string memory new_image, string memory new_text) public payable returns(string memory, string memory, uint) {
        require(msg.value > price, "Payment must be greater than the listed price");
        
        image_url = new_image;
        text = new_text;
        price = msg.value;

        return (image_url, text, price);
    }
}