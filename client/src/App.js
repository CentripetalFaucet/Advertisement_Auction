import React, { Component } from "react";
import AdvertisementContract from "./contracts/Advertisement.json";
import getWeb3 from "./getWeb3";

import Advertisement from "./Components/Advertisement"

import "./App.css";

class App extends Component {
  state = { loaded:false };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await this.web3.eth.net.getId();
      this.advertisementInstance = new this.web3.eth.Contract(
        AdvertisementContract.abi,
        AdvertisementContract.networks[networkId] && AdvertisementContract.networks[networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({loaded:true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading to load Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Advertisement web3={this.web3} accounts={this.accounts} contract={this.advertisementInstance}/>
      </div>
    );
  }
}

export default App;
