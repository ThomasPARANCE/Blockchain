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

  insertTransactionBlockMine = async (event) => {
     console.log("insertBlock");
     const target = event.target;
      console.log(target.id);
     API.insertTransactionBlockMine(localStorage.getItem("id_user"), target.id);
     this.getAllTransactionMempool();
  }

  getAllTransactionMempool = async () => {
   const {data} = await API.getAllTransactionMempool(localStorage.getItem("id_user"));
   console.log("getAllTransactionMempool");
   var temp = [];
   var i = 1;
   if (data.results.length > 0) {
      for (var item in data.results) {
         temp.push(

            <tr key={i}>
      <th className="mempoolTransactionCounter" scope="row">{i}</th>
      <td>{data.results[item].amount}</td>
      <td>{data.results[item].fee}</td>
      <td className="fixedCellSmaller">{data.results[item].public_key_from}</td>
      <td className="fixedCellSmaller">{data.results[item].public_key_to}</td>
      <td className="fixedCellSmaller">{data.results[item].private_key}</td>
      <td>
         <button id={data.results[item].id} className="btn btn-blue" data-remote="true" rel="nofollow" onClick={this.insertTransactionBlockMine}>INSERT TRANSACTION INTO NEW BLOCK TO BE MINED</button>
      </td>
      </tr>);
         i++;
      }
   } else {
      temp.push(
         <tr className="noMempooledTransactions">
         <td colSpan="9">
            No mempooled transactions found
         </td>
      </tr>

      );
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
            </tbody>
         </table>
      </div>
   </div>

    );
  }
}

export default NodeMempool;