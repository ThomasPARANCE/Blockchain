import React, { Component } from "react";

class NodeMempool extends Component {
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
         <table id="mempoolTransactionTable" className="table table-hover table-bordered text-table">
            <thead>
               <tr>
                  <th scope="col">Tx Nr</th>
                  <th scope="col">AMOUNT</th>
                  <th scope="col">FEE</th>
                  <th scope="col">FROM</th>
                  <th scope="col">TO</th>
                  <th scope="col">SIGNATURE</th>
                  <th scope="col">INSERT TRANSACTION INTO NEW BLOCK TO BE MINED</th>
               </tr>
            </thead>
            <tbody>
               <tr className="noMempooledTransactions">
                  <td colSpan="9">
                     No mempooled transactions found
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>

    );
  }
}

export default NodeMempool;