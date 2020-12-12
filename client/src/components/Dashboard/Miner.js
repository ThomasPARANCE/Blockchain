import React, { Component } from "react";

class Miner extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
        <div id="tabPaneContentBlockMining" class="containerBlockChain">
            Join the network, before mining!
        </div>
    );
  }
}

export default Miner;