import React, { Component } from "react";

class WalletGenKey extends Component {
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
         <table id="keyPairTable" className="table table-hover table-bordered text-table">
            <thead>
               <tr>
                  <th></th>
                  <th>PUBLIC KEY</th>
                  <th>PRIVATE KEY</th>
                  <th>BALANCE</th>
               </tr>
            </thead>
            <tbody>
               <tr className="noKeyPairs">
                  <td colSpan="4">
                     No key pairs found
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <form id="keyPairForm" autoComplete="off" action="https://blockchain-simulator.herokuapp.com/key_pairs" acceptCharset="UTF-8" data-remote="true" method="post">
         <input name="utf8" type="hidden" value="✓"/>
         <div id="keyGenerator" className="card">
            <div className="card-header">
               <h6>Public / Private Key Pairs</h6>
            </div>
            <div className="card-body">
               <div className="form-group">
                  <label htmlFor="private_key">Private Key</label>
                  <div className="input-group mb-3">
                     <input type="text" name="private_key" id="private_key" value="82109087884929047295119464724014690320116676470824831415873956594155398395929" className="form-control"/>
                     <div className="input-group-append">
                        <input className="btn btn-outline-secondary input-group-text" formAction="https://blockchain-simulator.herokuapp.com/key_pairs/generate" type="submit" value="Random"/><input type="hidden" name="authenticity_token" value="PS2yxPQoB4FdYxiUmoBF7qTKo1FRZPFe3qI3/a5xCUzYgfWWkYGM7XPJEc1A84VagDYDpZIBDUVEPVNMOBtN0A=="/>
                     </div>
                  </div>
               </div>
               <div className="form-group">
                  <label htmlFor="public_key">Public Key</label>
                  <input type="text" name="public_key" id="public_key" value="04864B4127FC5B03D435E9A150FEEFB4BD7EDC2E6F429BC553B8CB32BDD3B4BA9080F6D9E215D83764D27700DFB992075EAFCE989153D01F7C556825FB3C70328B" className="form-control" readOnly="readonly"/>
               </div>
            </div>
         </div>
      </form>
      <div className="text-center">
         <input type="submit" name="commit" value="SAFEKEEPING OF KEYS IN MY WALLET" className="btn btn-blue" form="keyPairForm" data-disable-with="SAFEKEEPING OF KEYS IN MY WALLET"/>
      </div>
   </div>

    );
  }
}

export default WalletGenKey;