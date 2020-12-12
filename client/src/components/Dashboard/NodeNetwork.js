import React, { Component } from "react";

class NodeNetwork extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
        <div class="containerBlockChain">
        <div className="text-center">
           <form className="button_to" method="post" action="https://blockchain-simulator.herokuapp.com/nodes/create" data-remote="true"><input className="btn btn-blue" id="joinNetwork" type="submit" value="JOIN THE NETWORK"/><input type="hidden" name="authenticity_token" value="PS2yxPQoB4FdYxiUmoBF7qTKo1FRZPFe3qI3/a5xCUzYgfWWkYGM7XPJEc1A84VagDYDpZIBDUVEPVNMOBtN0A=="/></form>
        </div>
        <table id="nodesTable" className="table table-hover table-bordered text-tab">
           <thead>
              <tr>
                 <th scope="col">NODE NR</th>
                 <th scope="col">BLOCKCHAIN LENGTH</th>
                 <th scope="col" className="d-none">User ID</th>
              </tr>
           </thead>
           <tbody>
              <tr className="">
                 <th className="nodeCounter" scope="row">NODE NR
                    1
                 </th>
                 <td data-userid="201">0
                    Blocks
                 </td>
                 <td className="d-none userId">201</td>
              </tr>
              <tr className="">
                 <th className="nodeCounter" scope="row">NODE NR
                    2
                 </th>
                 <td data-userid="212">0
                    Blocks
                 </td>
                 <td className="d-none userId">212</td>
              </tr>
              <tr className="">
                 <th className="nodeCounter" scope="row">NODE NR
                    3
                 </th>
                 <td data-userid="222">0
                    Blocks
                 </td>
                 <td className="d-none userId">222</td>
              </tr>
              <tr className="">
                 <th className="nodeCounter" scope="row">NODE NR
                    4
                 </th>
                 <td data-userid="202">0
                    Blocks
                 </td>
                 <td className="d-none userId">202</td>
              </tr>
              <tr className="">
                 <th className="nodeCounter" scope="row">NODE NR
                    5
                 </th>
                 <td data-userid="224">0
                    Blocks
                 </td>
                 <td className="d-none userId">224</td>
              </tr>
           </tbody>
        </table>
        <div className="text-center">
           <form className="button_to" method="post" action="https://blockchain-simulator.herokuapp.com/blocks/longest_blockchain" data-remote="true"><input className="btn btn-blue center-block" id="longestBlockchain" type="submit" value="Request copy of the LONGEST Blockchain"/><input type="hidden" name="authenticity_token" value="PS2yxPQoB4FdYxiUmoBF7qTKo1FRZPFe3qI3/a5xCUzYgfWWkYGM7XPJEc1A84VagDYDpZIBDUVEPVNMOBtN0A=="/></form>
        </div>
     </div>

    );
  }
}

export default NodeNetwork;