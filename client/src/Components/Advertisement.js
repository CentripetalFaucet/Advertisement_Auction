import React, { Component } from "react";

const eth_logo = "https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg"


class Advertisement extends Component {
    state = {image_url:"", text:"", price:0}
    constructor(props) {
        super(props);
    }

    componentDidMount = async() => {
        const advertisement = await this.props.contract.methods.getAdvertisement().call();
        this.setState({image_url:advertisement[0],text:advertisement[1],price:advertisement[2]});
    }

    buyAdvertisement() {
        //Handle multiple purchases at the same time
        console.log("HI")
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.text}
                </div>
                <img src={this.state.image_url}/>
                <div>
                    <button onClick={this.buyAdvertisement}>
                    Buy this space? Only {this.state.price} ETH!
                    </button>
                </div>

            </div>
        )
    }
}
export default Advertisement;