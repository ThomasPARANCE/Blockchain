import React, { Component } from "react";
import API from "../../utils/API";


class Economy extends Component {
  constructor() {
    super();
    this.state = {
        valuePublicKey: '',
        valueService: '',
        valuePrice: '',
        listEconomy: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getAllEconomy();
  }

  handleChange(event) {
    this.setState({valuePublicKey: event.target.value});
  }

  handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        API.addEconomy(this.state.valuePublicKey, this.state.valueService, this.state.valuePrice);
        var temp = this.state.listEconomy;
        temp.push(<tr>
            <td className="productCounter fixedCellSmaller">
            {this.state.valuePublicKey}
            </td>
            <td className="product_public_key fixedCellSmaller">
            {this.state.valueService}
            </td>
            <td>
            {this.state.valuePrice}
            </td>
        </tr>)
        this.setState({listEconomy: temp});
        event.preventDefault();
    }

    addEconomy = () => {
        API.addEconomy("expublicKey", "exservice", 150);
    }

    getAllEconomy = async () => {
        const { data } = await API.getAllEconomy();
        var temp = [];
        var i = 0;
        for (var item in data.results) {
            console.log(data.results[item].service);
            temp.push(<tr key={i}>
                <td className="productCounter fixedCellSmaller">
                {data.results[item].public_key}
                </td>
                <td className="product_public_key fixedCellSmaller">
                {data.results[item].service}
                </td>
                <td>
                {data.results[item].price}
                </td>
            </tr>);
            i++;
        }
        this.setState({listEconomy: temp});
   }

  render() {
    return (
        <div id="tabPaneContentEconomy" class="containerBlockChain">
            <form className="form-inline mt-4" id="goodForm" ref="form" onSubmit={this.handleSubmit}>
                <input name="utf8" type="hidden" value="✓"/>
                <div className="form-row">
                    <div className="col">
                    <input type="text" name="public_key" id="public_key" className="form-control" placeholder="Public Key" required="required" maxLength="150" value={this.state.valuePublicKey}
            onChange={this.handleChange}/>
                    </div>
                    <div className="col">
                    <input type="text" name="valueService" id="name" className="form-control" placeholder="Good/ Service" required="required" maxLength="50" value={this.state.valueService}
            onChange={this.handleInputChange}/>
                    </div>
                    <div className="col">
                    <input type="number" name="valuePrice" id="price" className="form-control" placeholder="Price" required="required" min="0.01" step="0.01" value={this.state.valuePrice}
            onChange={this.handleInputChange}/>
                    </div>
                    <div className="col">
                    <button type="submit" className="btn btn-secondary">SAVE</button>
                    </div>
                </div>
            </form>
            <div className="table-responsive mt-4">
                <table id="productsTable" className="table table-hover table-bordered text-tab">
                    <thead>
                    <tr>
                        <th scope="col">Public Key</th>
                        <th scope="col">Product/Service Offered</th>
                        <th scope="col">Price</th>
                    </tr>
                    </thead>
                    <tbody>{this.state.listEconomy}</tbody>
                </table>
            </div>
        </div>
    );
  }
}

export default Economy;