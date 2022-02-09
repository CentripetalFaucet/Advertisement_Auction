import React, { Component } from "react";

class Advertisement extends Component {
    
    constructor(props) {
        super(props);
        this.image_url = props.data[0]
        this.text = props.data[1]
        this.price = props.data[2]
        this.eth_logo = "https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg"
    }

    buyAdvertisement() {
        //Handle multiple purchases at the same time
        console.log("HI")
    }

    render() {
        return (
            <div>
                <div>
                    {this.text}
                </div>
                {/* <br/> */}
                <img src={this.image_url}/>
                <div>
                    <button onClick={this.buyAdvertisement}>
                    Buy this space? Only {this.price} ETH!
                    </button>
                </div>

            </div>
        )
    }
}
export default Advertisement;