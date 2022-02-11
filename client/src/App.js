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
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = AdvertisementContract.networks[networkId];
      this.advertisementInstance = new web3.eth.Contract(
        AdvertisementContract.abi,
        deployedNetwork && deployedNetwork.address,
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
        <Advertisement contract={this.advertisementInstance}/>
      </div>
    );
  }
}

export default App;
