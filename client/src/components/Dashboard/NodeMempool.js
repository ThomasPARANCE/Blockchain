import React, { Component } from "react";
import API from "../../utils/API";

class NodeMempool extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      listTransaction: [],
      key: 0
    };
    this.getAllTransactionMempool();
  }

  insertBlock = () => {
     console.log("insertBlock");
  }

  getAllTransactionMempool = async () => {
   const {data} = await API.getAllTransactionNetwork();
   console.log("getAllTransactionNetwork");
   var temp = [];
   var i = 1;
   for (var item in data.results) {
       temp.push(

         <tr key={i}>
    <th class="mempoolTransactionCounter" scope="row">{i}</th>
    <td>{data.results[item].amount}</td>
    <td>{data.results[item].fee}</td>
    <td class="fixedCellSmaller">{data.results[item].public_key_from}</td>
    <td class="fixedCellSmaller">{data.results[item].public_key_to}</td>
    <td class="fixedCellSmaller">{data.results[item].private_key}</td>
    <td>
      <button class="btn btn-blue" data-remote="true" rel="nofollow" onClick={this.insertBlock}>INSERT TRANSACTION INTO NEW BLOCK TO BE MINED</button>
    </td>
  </tr>);
       i++;
   }
   this.setState({listTransaction: temp});
   this.setState({key: i});
}

  render() {
    return (
      <div className="containerBlockChain">
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
               {this.state.listTransaction}
               {/* <tr className="noMempooledTransactions">
                  <td colSpan="9">
                     No mempooled transactions found
                  </td>
               </tr> */}
            </tbody>
         </table>
      </div>
   </div>

    );
  }
}

export default NodeMempool;