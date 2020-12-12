import React, { Component } from "react";

class NodeBlockChain extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div class="containerBlockChain">
      <h6>NEW BLOCK(S) TO VERIFY BEFORE INSERTION IN MY BLOCKCHAIN</h6>
      <div id="blockToVerify">
         <div id="noBlock">There are no blocks to verify!</div>
      </div>
      <hr/>
      <h6>MY BLOCKCHAIN</h6>
      <div id="blockChain">
         <div id="noBlockChain">There are no blocks in your blockchain!</div>
      </div>
   </div>

    );
  }
}

export default NodeBlockChain;