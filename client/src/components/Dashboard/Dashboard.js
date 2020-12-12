import API from "../../utils/API";
import React from "react";
import WalletGenKey from "./WalletGenKey";
import WalletTransaction from "./WalletTransaction";
import NodeNetwork from "./NodeNetwork";
import NodeBlockChain from "./NodeBlockChain";
import NodeTransaction from "./NodeTransaction";
import NodeMempool from "./NodeMempool";
import Miner from "./Miner";
import Economy from "./Economy";
// import './Dashboard.css';
// import { FormControl } from "react-bootstrap";

export class Dashboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
          showWalletGenKey: true,
         showWalletTransaction: false,
         showNodeNetwork: true,
         showNodeBlockchain: false,
         showNodeTransaction: false,
         showNodeMempool: false
      };
      this.hideComponent = this.hideComponent.bind(this);
    }



	disconect = () => {
		API.logout();
		window.location = "/";
	}

	saveKeys = () => {
		API.saveKeys("test", "test", localStorage.getItem("id_user"));
	}


   hideComponent(name) {
      console.log(name);
      switch (name) {
        case "showWalletGenKey":
            if (!this.state.showWalletGenKey)
                this.setState({ showWalletGenKey: !this.state.showWalletGenKey });
            if (this.state.showWalletTransaction)
               this.setState({ showWalletTransaction: !this.state.showWalletTransaction });
              break;
        case "showWalletTransaction":
         if (!this.state.showWalletTransaction)
            this.setState({ showWalletTransaction: !this.state.showWalletTransaction });
         if (this.state.showWalletGenKey)
               this.setState({ showWalletGenKey: !this.state.showWalletGenKey });
          break;
         case "showNodeNetwork":
            if (!this.state.showNodeNetwork)
               this.setState({ showNodeNetwork: !this.state.showNodeNetwork });
            if (this.state.showNodeBlockchain)
               this.setState({ showNodeBlockchain: !this.state.showNodeBlockchain });
            if (this.state.showNodeTransaction)
               this.setState({ showNodeTransaction: !this.state.showNodeTransaction });
            if (this.state.showNodeMempool)
               this.setState({ showNodeMempool: !this.state.showNodeMempool });
            break;
         case "showNodeBlockchain":
            if (!this.state.showNodeBlockchain)
               this.setState({ showNodeBlockchain: !this.state.showNodeBlockchain });
            if (this.state.showNodeNetwork)
               this.setState({ showNodeNetwork: !this.state.showNodeNetwork });
            if (this.state.showNodeTransaction)
               this.setState({ showNodeTransaction: !this.state.showNodeTransaction });
            if (this.state.showNodeMempool)
               this.setState({ showNodeMempool: !this.state.showNodeMempool });
            break;
         case "showNodeTransaction":
            if (!this.state.showNodeTransaction)
               this.setState({ showNodeTransaction: !this.state.showNodeTransaction });
            if (this.state.showNodeNetwork)
               this.setState({ showNodeNetwork: !this.state.showNodeNetwork });
            if (this.state.showNodeBlockchain)
               this.setState({ showNodeBlockchain: !this.state.showNodeBlockchain });
            if (this.state.showNodeMempool)
               this.setState({ showNodeMempool: !this.state.showNodeMempool });
            break;
         case "showNodeMempool":
            if (!this.state.showNodeMempool)
               this.setState({ showNodeMempool: !this.state.showNodeMempool });
            if (this.state.showNodeNetwork)
               this.setState({ showNodeNetwork: !this.state.showNodeNetwork });
            if (this.state.showNodeBlockchain)
               this.setState({ showNodeBlockchain: !this.state.showNodeBlockchain });
            if (this.state.showNodeTransaction)
               this.setState({ showNodeTransaction: !this.state.showNodeTransaction });
            break;
         default:
            this.setState({ showWalletTransaction: !this.state.showWalletTransaction });
         break;
     }
    }

	render() {
      const { showWalletGenKey, showWalletTransaction, showNodeNetwork, showNodeBlockchain, showNodeTransaction, showNodeMempool} = this.state;
		return (
   <div className="container-fluid">
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse justify-content-between" id="navbarNav">
         <ul className="navbar-nav mr-auto">
         <li className="nav-item">
            <a className="nav-link" href="/">Dashboard</a>
         </li>
         </ul>
         <ul className="navbar-nav">
         <li className="nav-item">
            <a className="nav-link" rel="nofollow" data-method="delete" href="#dashboard" onClick={this.disconect}>
               <strong>
               Logout <span className="oi oi-account-logout"></span>
               </strong>
            </a>
            </li>
         </ul>
      </div>
   </nav>
   <div className="jumbotron text-center color">
      <h1>BLOCKCHAIN SIMULATOR</h1>
   </div>
   <div className="col">
      <div id="dashboard" data-user-id="205">
         <div className="row">
            <div className="box col">
               <h2 className="title text-weight">MY LOCAL WALLET SOFTWARE</h2>
               <div className="row">
                  <div className="col-2">
                     <div className="nav flex-column nav-pills text-family" id="v-pills-tab">
                        <a className={`nav-link ${this.state.showWalletGenKey === true ? "active" : ""}`} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-blockchainkeys" onClick={() => this.hideComponent("showWalletGenKey")}>
                        <span className="oi oi-key"></span>
                        My Blockchain Keys
                        </a>
                        <a className={`nav-link ${this.state.showWalletTransaction === true ? "active" : ""}`} id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-transaction" onClick={() => this.hideComponent("showWalletTransaction")}>
                        <i className="fas fa-arrow-right"></i>
                        Transaction Initiation
                        </a>
                     </div>
                  </div>
                  <div id="boxLocalWallet" className="col-10 screenfullSection">
                     <div className="tab-content text-family fixContent" id="tabContentKeys">
                        {showWalletGenKey && <WalletGenKey />}
                        {showWalletTransaction && <WalletTransaction />}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="box col">
               <h2 className="title text-weight">MY LOCAL NODE SOFTWARE</h2>
               <div className="row">
                  <div className="col-2">
                     <div className="nav flex-column nav-pills text-family" id="v-pills-tab">
                        <a className={`nav-link ${this.state.showNodeNetwork === true ? "active" : ""}`} id="navNetwork" data-toggle="pill" href="#v-pills-network" onClick={() => this.hideComponent("showNodeNetwork")}>
                        <span className="oi oi-globe"></span>
                        Network
                        </a>
                        <a className={`nav-link ${this.state.showNodeBlockchain === true ? "active" : ""}`} id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-personalblockchain" onClick={() => this.hideComponent("showNodeBlockchain")}>
                        <i className="fas fa-cubes"></i>
                        My Personal Blockchain
                        </a>
                        <a className={`nav-link ${this.state.showNodeTransaction === true ? "active" : ""}`} id="v-pills-transactions-tab" data-toggle="pill" href="#v-pills-newtransactions" onClick={() => this.hideComponent("showNodeTransaction")}>
                        <i className="fas fa-forward"></i>
                        New Transactions Gossip
                        </a>
                        <a className={`nav-link ${this.state.showNodeMempool === true ? "active" : ""}`} id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-mempool" onClick={() => this.hideComponent("showNodeMempool")}>
                        <i className="fas fa-database"></i>
                        Mempool: Transactions to be Mined
                        </a>
                     </div>
                  </div>
                  <div id="boxNodeSoftware" className="col-10 screenfullSection">
                     <div className="tab-content text-family fixContent" id="tabContentNodes">
                        {showNodeNetwork && <NodeNetwork />}
                        {showNodeBlockchain && <NodeBlockChain />}
                        {showNodeTransaction && <NodeTransaction />}
                        {showNodeMempool && <NodeMempool />}
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="box col">
               <h2 className="title text-weight">MY LOCAL MINER SOFTWARE</h2>
               <div className="row">
                  <div className="col-2">
                     <div className="nav flex-column nav-pills text-family" id="v-pills-tab">
                        <a className="nav-link active" id="navBlockMining" data-toggle="pill" href="#tabPaneContentBlockMining">
                        <i className="fas fa-cube"></i>
                        Block Mining
                        </a>
                     </div>
                  </div>
                  <div id="boxMinerSoftware" className="col-10 screenfullSection">
                     <div className="tab-content fixContent text-family" id="tabContentBlockMining">
                        <Miner/>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="box col">
               <h2 className="title text-weight">THE ECONOMY</h2>
               <div className="row">
                  <div className="col-2">
                     <div className="nav flex-column nav-pills text-family" id="v-pills-tab">
                        <a className="nav-link active" id="navGoodServices" data-toggle="pill" href="#tabPaneContentBlockMining">
                        <i className="fas fa-chart-bar"></i>
                        Goods / Services
                        </a>
                     </div>
                  </div>
                  <div id="boxEconomy" className="col-10 screenfullSection">
                     <div className="tab-content text-family fixContent" id="tabContentEconomy">
                        <Economy/>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
		);
	}
}
