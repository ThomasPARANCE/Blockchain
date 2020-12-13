import React, { Component } from "react";
import API from "../../utils/API";

class NodeTransaction extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      listTransaction: [],
      key: 0
    };
    this.getAllTransactionNetwork();
  }

  checkBalance = (event) => {
   const target = event.target;
   target.className = "btn btn-success";
  }

  checkSignature = (event) => {
   const target = event.target;
   target.className = "btn btn-success";
   }

  getAllTransactionNetwork = async () => {
      const {data} = await API.getAllTransactionNetwork();
      console.log("getAllTransactionNetwork");
      var temp = [];
      var i = 1;
      for (var item in data.results) {
          temp.push(
            <tr key={i} data-signature="MEUCIFD+h8TYUeFxvRG8bjZLUfGQcgx14i69R3UrU4D6k1mtAiEAo0qr7Je/nOsXM5yBsyUrl2JxJ0oNgmQHOWOyLe0+E/w=">
            <th className="transactionCounter" scope="row">{i}</th>
            <td>{data.results[item].amount}</td>
            <td>{data.results[item].fee}</td>
            <td className="fixedCellSmaller">{data.results[item].public_key_from}</td>
            <td className="fixedCellSmaller">{data.results[item].public_key_to}</td>
            <td className="fixedCellSmaller">{data.results[item].private_key}</td>
            <td>
               <button className="btn btn-blue" data-remote="true" onClick={this.checkBalance}>CHECK BALANCE</button>
            </td>
            <td>
               <button className="btn btn-blue" data-remote="true" onClick={this.checkSignature} >CHECK SIGNATURE</button>
            </td>
            <td>
               <form className="button_to" data-remote="true"><input className="btn btn-blue" disabled="disabled" value="SEND TO MEMPOOL"/><input type="hidden" name="authenticity_token" value="aKpwNgWk08YHKKbylv+stgVRONsX/GfT816PHDHH/Br5tbiWK+EF568NeSuTE/quetXumtfRoRNl98DveFVG+Q=="/></form>
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
                     {this.state.listTransaction}
            </tbody>
            {/* <tbody>
               <tr className="noTransaction">
                  <td colSpan="9">
                     No gossiped transactions found
                  </td>
               </tr>
            </tbody> */}
         </table>
      </div>
   </div>

    );
  }
}

export default NodeTransaction;