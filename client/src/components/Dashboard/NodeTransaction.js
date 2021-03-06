import React, { Component } from "react";
import API from "../../utils/API";

class NodeTransaction extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      listTransaction: [],
      key: 0,
      listState: []
    };
    this.getAllTransactionNetwork();
    this.sendMempoolTransac = this.sendMempoolTransac.bind(this)

  }

  checkBalance = async (event) => {
      const target = event.target;
      var key = Number(target.name) - 1;
      var id = this.state.listState[key].id;
      const {data} = await API.checkBalance(id);
      var list = this.state.listState;
      if (data.results === true) {
         target.className = "btn btn-success"; 
         list[key].isBalance = true;
      } else {
         target.className = "btn btn-danger";  
         list[key].isBalance = false;
      }
      this.setState({listState: list});
      if (this.state.listState[key].isBalance && this.state.listState[key].isSignature) {
         console.log("OK");
         document.getElementById(target.name).className = 'btn btn-blue';
         // document.getElementById(target.name).removeAttribute('disabled');
      }
  }

  checkSignature = async (event) => {
      const target = event.target;
      var key = Number(target.name) - 1;
      var list = this.state.listState;
      var id = this.state.listState[key].id;
      const {data} = await API.checkSignature(id);
      console.log(data);
      if (data.checkSignature) {
         target.className = "btn btn-success";
         list[key].isSignature = true;
      } else {
         target.className = "btn btn-danger";
         list[key].isSignature = false;
      }
      this.setState({listState: list});
      if (this.state.listState[key].isBalance && this.state.listState[key].isSignature) {
         console.log("OK");
         document.getElementById(target.name).className = 'btn btn-blue';
      }
   }

   sendMempoolTransac = (event) => {
      console.log("sendMempoolTransac");
      const target = event.target;
      var key = Number(target.name) - 1;
      if (this.state.listState[key].isBalance && this.state.listState[key].isSignature) {
         var id = this.state.listState[key].id;
         API.sendMempool(id);
         document.getElementById("gossipTransactionTable").deleteRow(Number(target.name));
      }
   }

  getAllTransactionNetwork = async () => {
      const {data} = await API.getAllTransactionNetwork(localStorage.getItem('id_user'));
      console.log("getAllTransactionNetwork");
      var temp = [];
      var test = [];
      var i = 1;
      var idRow = "";
      if (data.results.length > 0) {
         for (var item in data.results) {
            idRow = "row*" + i;
            test.push({"id": data.results[item].id, "key": i ,"isBalance" : false, "isSignature": false});
            temp.push(
               <tr id={idRow} key={i} data-signature="MEUCIFD+h8TYUeFxvRG8bjZLUfGQcgx14i69R3UrU4D6k1mtAiEAo0qr7Je/nOsXM5yBsyUrl2JxJ0oNgmQHOWOyLe0+E/w=">
               <th className="transactionCounter" scope="row">{i}</th>
               <td>{data.results[item].amount}</td>
               <td>{data.results[item].fee}</td>
               <td className="fixedCellSmaller">{data.results[item].public_key_from}</td>
               <td className="fixedCellSmaller">{data.results[item].public_key_to}</td>
               <td className="fixedCellSmaller">{data.results[item].signature}</td>
               <td>
                  <button className="btn btn-blue" name={i} data-remote="true" onClick={this.checkBalance}>CHECK BALANCE</button>
               </td>
               <td>
                  <button className="btn btn-blue" name={i} data-remote="true" onClick={this.checkSignature} >CHECK SIGNATURE</button>
               </td>
               <td>
                  <button id={i} name={i} className="btn btn-secondary" data-remote="true" onClick={this.sendMempoolTransac}>SEND TO MEMPOOL</button>
               </td>
               </tr>);
            i++;
         }
      } else {
         temp.push(<tr className="noTransaction">
            <td colSpan="9">
               No gossiped transactions found
            </td>
         </tr>
         );
      }
      this.setState({listTransaction: temp});
      this.setState({key: i});
      this.setState({listState: test});
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
         </table>
      </div>
   </div>

    );
  }
}

export default NodeTransaction;