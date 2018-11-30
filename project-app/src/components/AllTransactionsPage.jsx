import React from "react";
import http from "axios";
import { NavLink } from "react-router-dom";

class AllTransactionsPage extends React.Component {
  state = {
    listofTransactions: []
  };

  baseUrl = "http://localhost:5000/api/transactions";

  async componentDidMount() {
    const response = await http.get(`${this.baseUrl}`);
    //console.log(response.status);
    if (response.status === 200) {
      const listofTransactions = response.data;
      this.setState({ listofTransactions });
    }
  }

  render() {
    const { listofTransactions } = this.state;
    return (
      <div className="offset-1 col-sm-10">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>A/C No.</th>
              <th>Transaction Mode</th>
              <th>Amount</th>
              <th>Current Balance</th>
              <th>Last Transaction Date</th>
              <th width="200">Action</th>
            </tr>
          </thead>
          <tbody>
            {listofTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.accountNo}</td>
                <td>{transaction.transactionMode}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.currentBalance}</td>
                <td>{transaction.txnDateTime}</td>
                <td>
                  <NavLink
                    to={`/person/detail/${transaction.id}`}
                    className="btn btn-sm btn-info ml-2"
                  >
                    Details
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default AllTransactionsPage;
