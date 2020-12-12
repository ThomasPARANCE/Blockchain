import React, { Component } from "react";

class WalletTransaction extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div class="containerBlockChain">
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
                        <input type="number" name="amount" id="amount" className="form-control" min="0.01" step="0.01" required="required"/>
                        <div className="input-group-prepend">
                           <span className="input-group-text">Fee</span>
                        </div>
                        <input type="number" name="fee" id="fee" className="form-control" min="0" step="0.01"/>
                        <div className="input-group-prepend">
                           <span className="input-group-text">From:</span>
                        </div>
                        <input type="text" name="from" id="from" className="form-control" required="required"/>
                        <div className="input-group-prepend">
                           <span className="input-group-text">To:</span>
                        </div>
                        <input type="text" name="to" id="to" className="form-control" required="required"/>
                     </div>
                     <div className="form-group">
                        <label htmlFor="private_key">Private Key</label>
                        <input type="text" name="private_key" id="private_key" className="form-control" required="required"/>
                     </div>
                     <input type="submit" name="commit" value="Sign" id="signTransaction" className="btn btn-blue btn-block" data-disable-with="Sign"/>
                  </form>
                  <div className="form-group">
                     <label htmlFor="signature">Message Signature</label>
                     <input type="text" name="signature" id="signature" className="form-control" disabled="disabled"/>
                  </div>
                  <div className="text-center">
                     <button name="button" type="submit" className="btn btn-blue" id="createTransactionButton">PUBLISH TRANSACTION TO THE NETWORK</button>
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