import React from "react";
import http from "axios";

class AccountOperationPage extends React.Component {
  state = {
    accountId: "",
    transactionMode: "",
    amount: "",
    listofaccount: [],
    isInsufficientBalance: undefined
  };

  baseUrl = "http://localhost:5000/api/accounts";

  async componentDidMount() {
    const response = await http.get(`${this.baseUrl}`);
    if (response.status === 200) {
      const listofaccount = response.data;
      this.setState({ listofaccount });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    //console.log(this.state);
  };

  handleChangeAmount = (event) => {
    const { value } = event.target;
    this.setState({ amount: value, isInsufficientBalance: undefined });
  };

  baseUrlTran = "http://localhost:5000/api/transactions";

  handleInsufficiectAmount = async () => {
    const { accountId, amount } = this.state;
    const response = await http.get(
      `${this.baseUrl}/check/balance/${accountId}/${amount}`
    );
    if (response.status === 200) {
      const { isInsufficient: isInsufficientBalance } = response.data;
      this.setState({ isInsufficientBalance });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { accountId, amount, transactionMode } = this.state;
    const response = await http.post(this.baseUrlTran, {
      accountId,
      transactionMode,
      amount
    });
    console.log(response.data);
    if (response.status === 200) {
      this.props.history.push("/allTransactionsPage");
    }
  };
  render() {
    const {
      listofaccount,
      accountId,
      amount,
      transactionMode,
      isInsufficientBalance
    } = this.state;
    return (
      <div className="card-body border minHeight">
        <div className="offset-2 col-sm-8">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="accountId" className="col-sm-4 col-form-label">
                A/C No.
              </label>
              <div className="col-sm-8">
                <select
                  name="accountId"
                  id="accountId"
                  className="form-control"
                  value={accountId}
                  onChange={this.handleChange}
                >
                  <option>--Select--</option>
                  {listofaccount.map((account, index) => (
                    <option key={index} value={account.id}>
                      {account.accountNo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lname" className="col-sm-4 col-form-label">
                Transaction Mode
              </label>
              <div className="col-sm-8">
                <select
                  name="transactionMode"
                  id="transactionMode"
                  className="form-control"
                  value={transactionMode}
                  onChange={this.handleChange}
                >
                  <option>--Select--</option>
                  <option value="dr">Withdraw</option>
                  <option value="cr">Deposit</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="amount" className="col-sm-4 col-form-label">
                Amount
              </label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={amount}
                  placeholder=""
                  onBlur={this.handleInsufficiectAmount}
                  onChange={this.handleChangeAmount}
                />
                {isInsufficientBalance && (
                  <span className="text-danger">
                    Insufficient Balance!
                  </span>
                )}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4" />
              <div className="col-sm-8">
                <button
                  className="btn  btn-primary"
                  type="submit"
                  disabled={isInsufficientBalance}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default AccountOperationPage;
