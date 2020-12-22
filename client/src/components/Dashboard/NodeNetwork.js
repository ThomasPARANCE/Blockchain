import React, { Component } from "react";
import API from "../../utils/API";

class NodeNetwork extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      listNetwork: [],
      key: 0
    };
    this.getTabNetwork();
  }

  joinNetwork = () => {
     API.joinNetwork(localStorage.getItem("id_user"));
  }

  getTabNetwork = async () => {
     const {data} = await API.getTabNetwork();
     console.log(data);
     var temp = [];
     var i = 0;
     for (var item in data.results) {
        console.log(data.results[item].id_user);
        console.log(data.results[item].id_user);
        if (data.results[item].id_user === Number(localStorage.getItem("id_user")))
        {
         temp.push(
            <tr className="bg-success" key={i}>
                 <th className="nodeCounter" scope="row">NODE NR
                    {i}
                 </th>
                 <td data-userid="201">{data.results[item].length_blockchain}
                       Blocks
                 </td>
                 <td className="d-none userId">{data.results[item].id_user}</td>
              </tr>);
        } else {
         temp.push(
            <tr className="" key={i}>
                 <th className="nodeCounter" scope="row">NODE NR
                    {i}
                 </th>
                 <td data-userid="201">{data.results[item].length_blockchain}
                       Blocks
                 </td>
                 <td className="d-none userId">{data.results[item].id_user}</td>
              </tr>);
        }
         i++;
     }
     this.setState({listNetwork: temp});
     this.setState({key: i});
  }

  render() {
    return (
        <div className="containerBlockChain">
        <div className="text-center">
           <form className="button_to" data-remote="true"><input className="btn btn-blue" id="joinNetwork" value="JOIN THE NETWORK" onClick={this.joinNetwork} readOnly="readonly"/><input type="hidden" name="authenticity_token" value="PS2yxPQoB4FdYxiUmoBF7qTKo1FRZPFe3qI3/a5xCUzYgfWWkYGM7XPJEc1A84VagDYDpZIBDUVEPVNMOBtN0A==" readOnly="readonly"/></form>
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
              {this.state.listNetwork}
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