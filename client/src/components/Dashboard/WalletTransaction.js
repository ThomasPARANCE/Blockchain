import React, { Component } from "react";
import API from "../../utils/API";

class WalletTransaction extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      valueAmount: '',
      valueFee: '',
      valueKeyFrom: '',
      valueKeyTo: '',
      valuePrivate: '',
      valueSignature: '',
      idSignature: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;

   this.setState({
       [name]: value
   });
   }

   addTransaction = async () => {
      const {data} = await API.addTransaction(this.state.valueAmount, this.state.valueFee, this.state.valueKeyFrom, this.state.valueKeyTo, this.state.valuePrivate);
      this.setState({valueSignature: "signature"});
      this.setState({idSignature: data.id});
   }

   publicNetwkork = () => {
      if (this.state.idSignature !== 0) {
         API.publicTransactionNetwkork(this.state.idSignature);
      }
   }

  render() {
    return (
      <div className="containerBlockChain">
      <div className="card">
         <div className="card-header">
            <h6>Transaction</h6>
         </div>
         <div className="card-body" id="transactionsContent">
            <div className="tab-pane fade show active" id="signContent">
               <div className="card-body">
                  <form autoComplete="off" action="https://blockchain-simulator.herokuapp.com/transactions/sign" acceptCharset="UTF-8" data-remote="true" method="post">
                     <input name="utf8" type="hidden" value="✓"/>
                     <label htmlFor="amount">Amount</label>
                     <div className="input-group mb-3">
                        <div className="input-group-prepend">
                           <span className="input-group-text">$</span>
                        </div>
                        <input type="number" name="valueAmount" id="amount" className="form-control" min="0.01" step="0.01" required="required" value={this.state.valueAmount} onChange={this.handleInputChange}/>
                        <div className="input-group-prepend">
                           <span className="input-group-text">Fee</span>
                        </div>
                        <input type="number" name="valueFee" id="fee" className="form-control" min="0" step="0.01" value={this.state.valueFee} onChange={this.handleInputChange}/>
                        <div className="input-group-prepend">
                           <span className="input-group-text">From:</span>
                        </div>
                        <input type="text" name="valueKeyFrom" id="from" className="form-control" required="required" value={this.state.valueKeyFrom} onChange={this.handleInputChange}/>
                        <div className="input-group-prepend">
                           <span className="input-group-text">To:</span>
                        </div>
                        <input type="text" name="valueKeyTo" id="to" className="form-control" required="required" value={this.state.valueKeyTo} onChange={this.handleInputChange}/>
                     </div>
                     <div className="form-group">
                        <label htmlFor="private_key">Private Key</label>
                        <input type="text" name="valuePrivate" id="private_key" className="form-control" required="required" value={this.state.valuePrivate} onChange={this.handleInputChange}/>
                     </div>
                     <input name="commit" value="Sign" id="signTransaction" className="btn btn-blue btn-block" data-disable-with="Sign" onClick={this.addTransaction}/>
                  </form>
                  <div className="form-group">
                     <label htmlFor="signature">Message Signature</label>
                     <input type="text" name="valueSignature" id="signature" className="form-control" disabled="disabled" value={this.state.valueSignature} onChange={this.handleInputChange}/>
                  </div>
                  <div className="text-center">
                     <button name="button" className="btn btn-blue" id="createTransactionButton" onClick={this.publicNetwkork}>PUBLISH TRANSACTION TO THE NETWORK</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>

    );
  }
}

export default WalletTransaction;