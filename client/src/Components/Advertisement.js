import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

class Advertisement extends Component {
    constructor(props) {
        super(props);

        this.state = { showModal: false, showDescription: false, newImage: "", newText: "" };

        this.openPurchaseModal = this.openPurchaseModal.bind(this);
        this.closePurchaseModal = this.closePurchaseModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.purchaseAdvertisement = this.purchaseAdvertisement.bind(this);
    }

    componentDidMount = async () => {
        const advertisement = await this.props.contract.methods.getAdvertisement().call();
        let price = parseInt(this.props.web3.utils.fromWei(advertisement[2])) + 1
        this.setState({ image_url: advertisement[0], text: advertisement[1], price: price, newPrice: price });
    }

    openPurchaseModal() {
        //Handle multiple purchases at the same time
        this.setState({ showModal: true });
    }

    closePurchaseModal() {
        this.setState({ showModal: false, newImage: "", newText: "", newPrice: this.state.price });
    }

    purchaseAdvertisement = async () => {
        console.log(this.state.newImage);
        console.log("Suck ME");
        let weiPrice = this.props.web3.utils.toWei(this.state.newPrice.toString(), 'ether');

        //TODO: Handle rejection
        let result = await this.props.contract.methods.updateAdvertisement(this.state.newImage, this.state.newText).send({ from: this.props.accounts[0], value: weiPrice })
        console.log(result)
        const advertisement = await this.props.contract.methods.getAdvertisement().call();
        let price = parseInt(this.props.web3.utils.fromWei(advertisement[2])) + 1
        this.setState({ image_url: advertisement[0], text: advertisement[1], price: price, newPrice: price });
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
                <h1>
                    {this.state.text}
                </h1>
                <img src={this.state.image_url} />
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