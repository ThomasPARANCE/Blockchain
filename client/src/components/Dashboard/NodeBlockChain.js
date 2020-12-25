import React, { Component } from "react";
import API from "../../utils/API";

class NodeBlockChain extends Component {
  constructor() {
    super();
    this.state = {
      blockInsertion: [],
      blockInsertionTable: [],
      key: 0,
      checkCoinbase: false,
      checkSignature: false,
      checkBalance: false,
      checkPreviousHash: false,
      checkHash: false,
      checkBlock: false,
      idBlock: 0,

      blockChain : [],
      name: "React"
    };
    this.getBlockToInsertion();
    this.getBlockchain();
  }

  checkBalance = () => {
    console.log("checkBalance");
    var temp = this.state.checkBalance;
    this.setState({checkBalance: !temp});
    console.log(this.state.checkBalance);
  }

  checkSignature = () => {
    console.log("checkSignature");
    var temp = this.state.checkSignature;
    this.setState({checkSignature: !temp});
    console.log(this.state.checkSignature);
  }

  checkHash= () => {
    console.log("checkHash");
    var temp = this.state.checkHash;
    this.setState({checkHash: !temp});
    console.log(this.state.checkHash);
  }

  sendToBlockChain = () => {
    console.log("sendToBlockChain");
    console.log(this.state.idBlock);
    API.sendToBlockChain(this.state.idBlock, localStorage.getItem("id_user"));
    console.log(this.state.checkCoinbase);
    console.log(this.state.checkSignature);
    console.log(this.state.checkBalance);
    console.log(this.state.checkPreviousHash);
    console.log(this.state.checkHash);
    console.log(this.state.checkBlock);
  }

  getBlockToInsertion = async () => {
    const {data} = await API.getBlockToInsertion(localStorage.getItem("id_user"));
    console.log(data);
    var temp = [];
    var tempTable = [];
    var i = 1;
    var tempidBlock = 0;
    if (data.results.length > 0) {
      for (var item in data.results) {
        tempTable.push(
        <tr key={i}>
            <td>{data.results[item].amount}</td>
            <td>{data.results[item].fee}</td>
            <td className="fixedCellSmaller">{data.results[item].public_key_from}</td>
            <td className="fixedCellSmaller">{data.results[item].public_key_to}</td>
            <td className="fixedCellSmaller">{data.results[item].signature}</td>
        </tr>
        );
        i++;
     }
     tempidBlock = data.idBlock;
     console.log(tempidBlock);
     console.log(data.idBlock);
     this.setState({blockInsertionTable: tempTable});
     this.setState({idBlock: tempidBlock});
      temp.push(
        <div key={i}>
        <div className="form-group">
            <label htmlFor="number">Block</label>
            <div className="input-group">
              <div className="input-group-prepend">
                  <div className="input-group-text">#</div>
              </div>
              <input type="text" name="number" id="number" value={data.results[0].block_nbr} className="form-control" readOnly="readonly" />
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="nonce">Nonce</label>
            <input type="text" name="nonce" id="nonce" value={data.results[0].nonce} className="form-control" readOnly="readonly"/>
        </div>
        <div className="form-group">
            <label htmlFor="data">Data</label>
            <div className="table-responsive">
              <table id="minedTransactionsTable" className="table table-hover table-bordered text-table">
                  <thead>
                    <tr>
                        <th scope="col">AMOUNT</th>
                        <th scope="col">FEE</th>
                        <th scope="col">FROM</th>
                        <th scope="col">TO</th>
                        <th scope="col">SIGNATURE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.blockInsertionTable}
                  </tbody>
              </table>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="previous_hash">Prev</label>
            <input type="text" name="previous_hash" id="previous_hash" value={data.results[0].prev_hash} className="form-control" readOnly="readonly"/>
        </div>
        <div className="form-group">
            <label htmlFor="current_hash">Hash</label>
            <input type="text" name="current_hash" id="current_hash" value={data.results[0].hash} className="form-control" readOnly="readonly"/>
        </div>
        <div className="row coinbase ">
            <span className="col-5"></span>
            <span className="col-5 small py-2">COINBASE OK?</span>
            <span className="col-2">
            <input type="checkbox" name="coinbase_ok" id="coinbase_ok" value="true" data-remote="true" onClick={this.setState({checkCoinbase: !this.state.checkCoinbase})} />
            </span>
        </div>
        <div className="row signatures ">
            <span className="col-5 ">
              <form className="button_to" data-remote="true"><input className="btn btn-blue my-1 py-1" onClick={this.checkSignature} value="Check Signatures" readOnly="readonly"/><input type="hidden" name="authenticity_token" value="KDyEgxn0JIJkZ4OWfjuM/GjMcAizmodlaby9OTrPHYwXye3HxzoG+efyJEP0ikmW1405TEOQsWAaZ/aA4Tun3w=="/></form>
            </span>
            <span className="col-5 small py-2">SIGNATURES OK?</span>
            <span className="col-2 ">
            <input type="checkbox" name="signatures_ok" id="signatures_ok" value={this.state.checkSignature} data-remote="true" readOnly="readonly"/>
            </span>
        </div>
        <div className="row balances ">
            <span className="col-5 ">
              <form className="button_to" data-remote="true"><input className="btn btn-blue my-1 py-1" onClick={this.checkBalance} value="Check Balances" readOnly="readonly"/><input type="hidden" name="authenticity_token" value="QA7HEC37qLMqXed6wSyxVvzs3PYaXjrCyS0oxbydwE0+fLqdpEHwca9nKZDtVd6CvH1WsCmPnHq5PGtoyFzLtw=="/></form>
            </span>
            <span className="col-5 small py-2">SUFFICIENT BALANCES?</span>
            <span className="col-2 ">
            <input type="checkbox" name="sufficient_balances" id="sufficient_balances" value={this.state.checkBalance} data-remote="true" readOnly="readonly" />
            </span>
        </div>
        <div className="row previousHashOk ">
            <span className="col-5 "></span>
            <span className="col-5 small py-2">PREVIOUS HASH OK?</span>
            <span className="col-2 ">
            <input type="checkbox" name="previous_hash_ok" id="previous_hash_ok" value="true" data-remote="true" onClick={this.setState({checkPreviousHash: !this.state.checkPreviousHash})}/>
            </span>
        </div>
        <div className="row hash ">
            <span className="col-5 ">
              <form className="button_to" data-remote="true"><input className="btn btn-blue my-1 py-1" onClick={this.checkHash} value="Check Hash" readOnly="readonly"/><input type="hidden" name="authenticity_token" value="SnqfC/apmAZR+ddfhxqEkCg2b1TpLkeAr4+K/Ga7w1s5Y6QkzDVxfGJURo7stcB+PJgKm+F1x+FDPH7xV/nesA=="/></form>
              <span id="checkHashValue"></span>
            </span>
            <span className="col-5 small py-2">HASH OK?</span>
            <span className="col-2 ">
            <input type="checkbox" name="hash_ok" id="hash_ok" value={this.state.checkHash} data-remote="true" readOnly="readonly"/>
            </span>
        </div>
        <div className="row approvalOfBlock ">
            <span className="col-5 "></span>
            <span className="col-5 small py-2">MY APPROVAL OF BLOCK</span>
            <span className="col-2 ">
            <input type="checkbox" name="approval_of_block" id="approval_of_block" value="true" data-remote="true" onClick={this.setState({checkBlock: !this.state.checkBlock})}/>
            </span>
        </div>
        <div className="text-center">
            <form className="button_to" data-remote="true"><input id="sendToBlockchainButton" className="btn btn-blue center-block" onClick={this.sendToBlockChain} value="SEND TO &quot;MY BLOCKCHAIN&quot;" readOnly="readonly"/><input type="hidden" name="authenticity_token" value="naS6uviN/O797U8M+DyQ2ojj+LY8H+k2ONQauf3/TaFxX0EvOxPfDIMj44ZHkalNtA+tb039Yv+okGxPwCYYzw=="/></form>
        </div>
      </div>

      );


    } else {
       temp.push(
        <div id="noBlock">There are no blocks to verify!</div>
       );
    }
    this.setState({blockInsertion: temp});
    this.setState({key: i});
  }

  getBlockchain = async () => {
    const {data} = await API.getUserBlockchain(localStorage.getItem("id_user"));
    console.log(data);
    var tempTable = [];
    var i = 100;
    var nbr_block = -1;
    var table = []
    if (data.results.length > 0) {
      for (var item in data.results) {
        console.log(data.results[item].block_nbr);
        console.log(nbr_block);
        if (data.results[item].block_nbr > nbr_block) {
          console.log("reset");
          nbr_block = data.results[item].block_nbr;
          table = [];
          for (var transaction in data.results) {
            if (data.results[transaction].block_nbr === nbr_block) {
              table.push(
                <tr key={i}>
                  <td>{data.results[transaction].amount}</td>
                  <td>{data.results[transaction].fee}</td>
                  <td>{data.results[transaction].public_key_from}</td>
                  <td>{data.results[transaction].public_key_to}</td>
                  <td>{data.results[transaction].signature}</td>
                </tr>
                );
                i++;
                console.log(data.results[transaction].public_key_to);
            }
          }
          tempTable.push(
            <div key={i} className="card">
            <div className="card-body">
                <div className="form-group">
                  <label htmlFor="number">Block</label>
                  <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">#</div>
                      </div>
                      <input type="text" name="number" id="number" value={data.results[item].block_nbr} className="form-control" readOnly="readOnly"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="nonce">Nonce</label>
                  <input type="text" name="nonce" id="nonce" value={data.results[item].nonce} className="form-control" readOnly="readOnly"/>
                </div>
                <div className="form-group">
                  <label htmlFor="data">Data</label>
                  <div className="table-responsive">
                      <table id="blockedTransactionsTable" className="table table-hover table-bordered text-table">
                        <thead>
                            <tr>
                              <th scope="col">AMOUNT</th>
                              <th scope="col">FEE</th>
                              <th scope="col">FROM</th>
                              <th scope="col">TO</th>
                              <th scope="col">SIGNATURE</th>
                            </tr>
                        </thead>
                        <tbody>
                          {table}
                        </tbody>
                      </table>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="previous_hash">Prev</label>
                  <input type="text" name="previous_hash" id="previous_hash" value={data.results[item].prev_hash} className="form-control" readOnly="readonly"/>
                </div>
                <div className="form-group">
                  <label htmlFor="current_hash">Hash</label>
                  <input type="text" name="current_hash" id="current_hash" value={data.results[item].hash} className="form-control" readOnly="readonly"/>
                </div>
            </div>
          </div>
          );
        }
        i++;
      }
     } else {
       tempTable.push(
        <div id="noBlockChain">There are no blocks in your blockchain!</div>
       );
     }
     this.setState({blockChain: tempTable});

  }

  render() {
    return (
        <div className="containerBlockChain" id="tabContentNodes">
            <div className="" id="v-pills-personalblockchain">
              <h6>NEW BLOCK(S) TO VERIFY BEFORE INSERTION IN MY BLOCKCHAIN</h6>
              <div id="blockToVerify">
                {this.state.blockInsertion}
              </div>
              <hr/>
              <h6>MY BLOCKCHAIN</h6>
              <div id="blockChain">
                {this.state.blockChain}
              </div>
            </div>
        </div>
    );
  }
}

export default NodeBlockChain;
