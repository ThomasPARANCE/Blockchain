import React, { Component } from "react";
import API from "../../utils/API";

class Miner extends Component {
  constructor() {
    super();
    this.state = {
      blockMiner: [],
      blockMinerTable:[],
      isNetwork: false,
      idBlock: 0,
      blockNbr: 0,
      nonce: 0,
      hash: "",
      previous_hash: "",
      key: 0,
      name: "React"
    };
    this.isNetwork();
  }

  Mine = async () => {
    console.log("Mine");
    const {data} = await API.Mine(localStorage.getItem("id_user"), this.state.idBlock, this.state.blockNbr, this.state.previous_hash);
    console.log(data);
    var tempnonce = data.nonce;
    var temphash = data.hash;
    this.setState({nonce: tempnonce});
    this.setState({hash: temphash});
    this.isNetwork();
  }

  resetBlock = () => {
    console.log("resetBlock");
    API.resetBlock(localStorage.getItem("id_user"), this.state.idBlock);
  }

  insertPreviousHash = async () => {
    console.log("insertPreviousHash");
    console.log(this.state.blockNbr);
    const {data} = await API.insertPreviousHash(localStorage.getItem("id_user"), this.state.blockNbr, this.state.idBlock);
    var temphashprevious = data.hash
    this.setState({previous_hash: temphashprevious});
    this.isNetwork();
  }

  sendBlock = () => {
    console.log("sendBlock");
    API.sendBlock(localStorage.getItem("id_user"), this.state.idBlock);
  }

  isNetwork = async () => {
          const { data } = await API.getBlockMiner(localStorage.getItem("id_user"));
          var tmp = [];
          var tempTable = [];
          var i = 1;
          var tempIdBlock = 0;
          var tempBlockNbr = 0;
          console.log(data.results);
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
         tempIdBlock = data.results[0].id_block;
         tempBlockNbr = data.results[0].block_nbr;
         this.setState({idBlock: tempIdBlock});
         this.setState({blockNbr: tempBlockNbr});
         this.setState({blockMinerTable: tempTable});
            tmp.push(
              <div key={i} >
                <div className="containerBlockChain" id="tabPaneContentBlockMining">
                    <form id="block-mining" autoComplete="off" acceptCharset="UTF-8" data-remote="true">
                      <input name="utf8" type="hidden" value="✓"/>
                      <div className="form-group">
                          <label htmlFor="number">Block</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">#</div>
                            </div>
                            <input type="text" name="number" id="number" value={data.results[0].block_nbr} className="form-control" readOnly="readonly"/>
                          </div>
                      </div>
                      <br/>
                      <div className="form-group">
                          <label htmlFor="nonce">Nonce</label>
                          <input type="text" name="nonce" id="nonce" className="form-control" value={this.state.nonce} readOnly="readonly" />
                      </div>
                      <div className="form-group">
                          <label htmlFor="data">Data</label>
                          <div className="table-responsive">
                            <table id="miningTransactionTable" className="table table-hover table-bordered text-table">
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
                                  {this.state.blockMinerTable}
                                </tbody>
                            </table>
                          </div>
                      </div>
                      <div className="form-group">
                          <label htmlFor="previous_hash">Prev</label>
                          <input type="text" name="previous_hash" id="previous_hash" className="form-control" value={this.state.previous_hash} readOnly="readonly"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="current_hash">Hash</label>
                          <input type="text" name="current_hash" id="current_hash" className="form-control" value={this.state.hash} readOnly="readonly"/>
                      </div>
                      <div className="form-group">
                          <div className="col-4">
                            <input  name="commit" value="Mine" id="mineButton" className="btn btn-blue mb-2" data-disable-with="Mine" onClick={this.Mine} readOnly="readonly"/>
                          </div>
                      </div>
                    </form>
                    <div className="col">
                      <p>
                          <button id="resetBlock" className="btn btn-secondary btn-block" data-remote="true" onClick={this.resetBlock} >RESET BLOCK</button>
                      </p>
                      <p>
                          <button id="insertPreviousHash" className="btn btn-secondary btn-block" data-remote="true" onClick={this.insertPreviousHash} >INSERT PREVIOUS BLOCK HASH</button>
                      </p>
                      <p>
                      </p>
                      <form id="formBlockMinedToNetwork" autoComplete="off" acceptCharset="UTF-8" data-remote="true"  ><input name="utf8" type="hidden" value="✓"/>
                          <input type="hidden" name="nonce" id="nonce"/>
                          <input type="hidden" name="current_hash" id="current_hash"/>
                          <input type="hidden" name="previous_hash" id="previous_hash"/>
                          <input name="commit" value="SEND BLOCK TO THE NETWORK" id="sendBlockToNetwork" className="btn btn-secondary btn-block" remote="true"  data-disable-with="SEND BLOCK TO THE NETWORK" onClick={this.sendBlock} readOnly="readonly"/>
                      </form>
                      <p></p>
                    </div>
                </div>
              </div>
            )
        } else {
            tmp.push(
                <div key={i}  id="tabPaneContentBlockMining" className="containerBlockChain">
                    Join the network, before mining!
                </div>
            )
        }
        this.setState({blockMiner: tmp});
        this.setState({key: i});
  }

  render() {
    return (
        <div> {this.state.blockMiner} </div>
    );
  }
}

export default Miner;
