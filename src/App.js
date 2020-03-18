import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faThumbsUp, faThumbsDown, faMoneyCheckAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {

    state = {
        isLoading: false,
        invoices: [{
            "Id": "100",
            "Vender": "Alice",
            "Amount": "$12,000",
            "Invoice": "abcde",
            "Date": "02/03/2020"
        },
        {
            "Id": "200",
            "Vender": "Alice",
            "Amount": "$12,000",
            "Invoice": "abcde",
            "Date": "02/03/2020"
        },
        {
            "Id": "300",
            "Vender": "Alice",
            "Amount": "$12,000",
            "Invoice": "abcde",
            "Date": "02/03/2020"
        }]
    }

    remove(id) {
        console.log(id);
        let newInvoices = [...this.state.invoices].filter(i => i.Id !== id);
        this.setState({ invoices: newInvoices });
    }

    async componentDidMount() {
        const response = await fetch(
          "https://9lotm9qldk.execute-api.us-west-1.amazonaws.com/Dev"
        );
        const body = await response.json();
        this.setState({ invoices: body, isLoading: false });
    }

    render() {
        const isLoading = this.state.isLoading;
        const allInvoices = this.state.invoices;

        if (isLoading) {
            return (<div>Loading.....</div>)
        }

        let invoices = allInvoices.map(invoices =>
            <tr key={invoices.Id}>
                <td>{invoices.Vender}</td>
                <td>{invoices.Amount}</td>
                <td>{invoices.Invoice}</td>
                <td>{invoices.Date}</td>
                <td><Button className="btn btn-lg btn-success" onClick={() => this.remove(invoices.Id)}> <FontAwesomeIcon icon={faThumbsUp} /> OK</Button></td>
                <td><Button className="btn btn-lg btn-danger" onClick={() => this.remove(invoices.Id)}><FontAwesomeIcon icon={faThumbsDown} /> NOK</Button></td>
                <td><Button className="btn btn-lg btn-info" onClick={() => this.remove(invoices.Id)}><FontAwesomeIcon icon={faMoneyCheckAlt} /> 50%</Button></td>
                <td><Button className="btn btn-lg btn-warning" onClick={() => this.remove(invoices.Id)}><FontAwesomeIcon icon={faSearchDollar} /> ??</Button></td>
                <td><Button className="btn btn-lg btn-info" onClick={() => this.remove(invoices.Id)}><FontAwesomeIcon icon={faImage} /> Image</Button></td>
            </tr>
        )

        let emptyInvoices =  <tr><td colSpan="9">All caught up!</td></tr>

        return (
            <div className="container border border-secondary round center">
                <div className="row">
                    <div className="col-12">
                        <h4>Pending Invoices - the test company</h4>
                    </div>
                </div>

                <div className="row">
                    <div className=".col-xs-12 center text-center">
                        <Table dark responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Vender</th>
                                    <th>Amount</th>
                                    <th>Invoices</th>
                                    <th>Date</th>
                                    <th colSpan="4">Actions</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.invoices.length === 0 ? emptyInvoices : invoices}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
