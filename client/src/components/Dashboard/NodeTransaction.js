import React, { Component } from "react";

class NodeTransaction extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div class="containerBlockChain">
      <div className="table-responsive">
         <table id="gossipTransactionTable" className="table table-hover table-bordered text-table">
            <thead>
               <tr>
                  <th scope="col">Tx Nr</th>
                  <th scope="col">AMOUNT</th>
                  <th scope="col">FEE</th>
                  <th scope="col">FROM</th>
                  <th scope="col">TO</th>
                  <th scope="col">SIGNATURE</th>
                  <th scope="col">BALANCE OK?</th>
                  <th scope="col">SIGNATURE OK?</th>
                  <th scope="col">SEND TO MEMPOOL</th>
               </tr>
            </thead>
            <tbody>
               <tr className="noTransaction">
                  <td colSpan="9">
                     No gossiped transactions found
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>

    );
  }
}

export default NodeTransaction;