import React from "react";
import http from "axios";
import { NavLink } from "react-router-dom";

class DetailAccountPage extends React.Component {
  state = {
    account: {
      firstName: "",
      lastName: "",
      accountNo: "",
      balance: "",
      createdAt:'',
      updatedAt:''
    }
  };

  baseUrl = "http://localhost:5000/api/accounts";
  
  async componentDidMount() {
    const { params } = this.props.match;
    if (!params || !params.id) {
      this.props.history.goBack();
      return;
    }
    const id = params.id;
    const response = await http.get(`${this.baseUrl}/${id}`); //get by id
    if (response.status === 200) {
      const account = response.data;
      this.setState({ account });
    } else {
      this.props.history.goBack();
      return;
    }
  }

  render() {
    const { account } = this.state;
    return (
      <div>
        <div className="d-flex justify-content-end mb-2">
          <NavLink to="/accountIndexPage" className="btn btn-info">
            Go back
          </NavLink>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{`${account.firstName}${account.lastName}`}</td>
            </tr>
            <tr>
              <td>Account No.</td>
              <td>{account.accountNo}</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>{account.balance}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{account.createdAt}</td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>{account.UpdatedAt}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default DetailAccountPage;
