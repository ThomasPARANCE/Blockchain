import React, { Component } from "react";
import API from "../../utils/API";

var crypto = require('crypto');

class WalletGenKey extends Component {
  constructor() {
    super();
   var prime_length = 310;
   var diffHell = crypto.createDiffieHellman(prime_length);

   diffHell.generateKeys('base64');

   var temp = [];
   temp.push(<tr key="1" className="noKeyPairs">
         <td colSpan="4">
            No key pairs found
         </td>
      </tr>
   );

   this.state = {
      valueKeyPublic : diffHell.getPublicKey('hex'),
      valueKeyPrivate : diffHell.getPrivateKey('hex'),
      listKey: temp
    };
    this.genKey = this.genKey.bind(this)
  }

  genKey = (event) => {
      event.preventDefault();
      var prime_length = 310;
      var diffHell = crypto.createDiffieHellman(prime_length);

      diffHell.generateKeys('base64');

      console.log("Public Key : " ,diffHell.getPublicKey('hex'));
      console.log("Private Key : " ,diffHell.getPrivateKey('hex'));
      this.setState({valueKeyPublic: diffHell.getPublicKey('hex')});
      this.setState({valueKeyPrivate: diffHell.getPrivateKey('hex')});
      console.log("genKey finish");
      event.preventDefault();
  }

  saveKeys = () => {
      API.saveKeys(this.state.valueKeyPublic, this.state.valueKeyPrivate, localStorage.getItem("id_user"));
      var valuePublic = this.state.valueKeyPublic;
      var valuePrivate = this.state.valueKeyPrivate;
      var temp=[];
      temp.push(<tr key="1" >
         <th>1</th>
         <td className="fixedCell">
           <span>{valuePublic}</span>
         </td>
         <td className="fixedCell">
           <span>{valuePrivate}</span>
         </td>
         <td>1000.0</td>
       </tr>);
       this.setState({listKey: temp});
   }

  render() {
    return (
      <div className="containerBlockChain">
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
               {this.state.listKey}
            </tbody>
         </table>
      </div>
      <form id="keyPairForm" ref="form">
         <input name="utf8" type="hidden" value="✓"/>
         <div id="keyGenerator" className="card">
            <div className="card-header">
               <h6>Public / Private Key Pairs</h6>
            </div>
            <div className="card-body">
               <div className="form-group">
                  <label htmlFor="private_key">Private Key</label>
                  <div className="input-group mb-3">
                     <input type="text" name="private_key" id="private_key" value={this.state.valueKeyPrivate} className="form-control" readOnly="readonly"/>
                     <div className="input-group-append">
                        <input className="btn btn-outline-secondary input-group-text" onClick={this.genKey} value="Random" readOnly="readonly"/>
                        {/* <input type="hidden" name="authenticity_token" value="PS2yxPQoB4FdYxiUmoBF7qTKo1FRZPFe3qI3/a5xCUzYgfWWkYGM7XPJEc1A84VagDYDpZIBDUVEPVNMOBtN0A=="/> */}
                     </div>
                  </div>
               </div>
               <div className="form-group">
                  <label htmlFor="public_key">Public Key</label>
                  <input type="text" name="public_key" id="public_key" value={this.state.valueKeyPublic} className="form-control" readOnly="readonly"/>
               </div>
            </div>
         </div>
      </form>
      <div className="text-center">
         <input name="commit" value="SAFEKEEPING OF KEYS IN MY WALLET" className="btn btn-blue" data-disable-with="SAFEKEEPING OF KEYS IN MY WALLET" onClick={this.saveKeys} readOnly="readonly"/>
      </div>
   </div>

    );
  }
}

export default WalletGenKey;