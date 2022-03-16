import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import ipfs from "../ipfs";


class Advertisement extends Component {
    constructor(props) {
        super(props);

        this.state = { showModal: false, 
            showDescription: false, 
            newImage: "", 
            newText: "",
            ipfsHash: null };

        this.openPurchaseModal = this.openPurchaseModal.bind(this);
        this.closePurchaseModal = this.closePurchaseModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.purchaseAdvertisement = this.purchaseAdvertisement.bind(this);
    }

    componentDidMount = async () => {
        this.getAdvertisementFromContract();
    }

    getAdvertisementFromContract = async() => {
        const advertisement = await this.props.contract.methods.getAdvertisement().call();
        console.log(advertisement);
        let image_url = await this.retrieveFromIpfs(advertisement[0]);
        let text = await this.retrieveFromIpfs(advertisement[1]);
        let price = parseInt(this.props.web3.utils.fromWei(advertisement[2])) + 1
        this.setState({ image_url: image_url, text: text, price: price, newPrice: price });
    }

    retrieveFromIpfs = async(ipfsHash) => {
        console.log(ipfsHash);
        let buffer = await ipfs.cat(ipfsHash);
        return buffer.toString();
    }

    openPurchaseModal() {
        //Handle multiple purchases at the same time
        this.setState({ showModal: true });
    }

    closePurchaseModal() {
        this.setState({ showModal: false, newImage: "", newText: "", newPrice: this.state.price });
    }

    sendDataToIPFS = async(data) => {
        const buffer = ipfs.Buffer;
        // const object = {
        //     content: data
        // }

        // const objectString = 
        let bufferedString = await buffer.from(data);

        let ipfsHash = await ipfs.add(bufferedString)
        // , (err, ipfsHash) => {
        //     console.log(err, ipfsHash);
        //     // this.setState({ ipfsHash: ipfsHash[0].hash });
        //     // return ipfsHash[0].hash;
        //     ipfsData = ipfsHash[0].hash;
            
        // }
        return ipfsHash[0].hash;
        // return ipfsData;
    }

    purchaseAdvertisement = async () => {
        console.log(this.state.newImage);
        let weiPrice = this.props.web3.utils.toWei(this.state.newPrice.toString(), 'ether');

        //TODO: Handle rejection
        // const imageIpfsHash = this.sendDataToIPFS(this.state.newImage).then(result => {
        //     console.log("Image Hash:");
        //     console.log(result);
        // });
        const imageIpfsHash = await this.sendDataToIPFS(this.state.newImage)
        const textIpfsHash = await this.sendDataToIPFS(this.state.newText)
        // console.log(imageIpfsHash);
        // console.log(textIpfsHash);

        // let resultVal = await ipfs.cat(imageIpfsHash);
        // const buffer = ipfs.Buffer;
        // buffer.
        // resultVal = resultVal.toString();
        // console.log(resultVal);

        let result = await this.props.contract.methods.updateAdvertisement(imageIpfsHash, textIpfsHash).send({ from: this.props.accounts[0], value: weiPrice })

        console.log(result)
        // const advertisement = await this.props.contract.methods.getAdvertisement().call();
        // let price = parseInt(this.props.web3.utils.fromWei(advertisement[2])) + 1
        // this.setState({ image_url: advertisement[0], text: advertisement[1], price: price, newPrice: price });
        this.getAdvertisementFromContract();
        this.closePurchaseModal()
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    render() {
        return (
            <div>
                <h1 className="Header-text">
                    {this.state.text}
                </h1>
                <div className="Image-div">
                    <img className="Display-image" src={this.state.image_url} />
                </div>
                <div>
                    <br />
                    <Button onClick={this.openPurchaseModal}>
                        Buy this space!
                    </Button>


                    <Modal show={this.state.showModal} onHide={this.closePurchaseModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Purchase Advertisement Spot</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className="Purchase-label">
                                    New Image URL
                                </div>
                                <input type="text" className="Input-field" name="newImage" value={this.state.newImage} onChange={this.handleInputChange} />
                            </div>
                            <br />
                            <div>
                                <div className="Purchase-label">
                                    New Header Text
                                </div>
                                <input type="text" className="Input-field" name="newText" value={this.state.newText} onChange={this.handleInputChange} />
                            </div>
                            <br />
                            <div>
                                <div className="Purchase-label">
                                    Price <span className="Info-label" onClick={() => this.setState({ showDescription: !this.state.showDescription })}>Why is this an option?</span>
                                </div>
                                <Collapse in={this.state.showDescription}>
                                    <div className="Price-description">
                                        Advertisement purchases have a minimum price, but increasing your price could extend the time before another advert is purchased to replace yours!
                                    </div>
                                </Collapse>

                                <input type="number" className="Input-field" name="newPrice" min={this.state.price} value={this.state.newPrice} onChange={this.handleInputChange} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closePurchaseModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.purchaseAdvertisement}>
                                Purchase
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </div>
            </div>
        )
    }
}
export default Advertisement;