import React from "react";
import http from "axios";

class CreateAccountPage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    accountNo: "",
    balance: "",
    isAccountExist: undefined
  };

  baseUrl = "http://localhost:5000/api/accounts";

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    //console.log(this.state);
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { firstName, lastName, accountNo, balance } = this.state;
    const response = await http.post(this.baseUrl, {
      firstName,
      lastName,
      accountNo,
      balance
    });
    console.log(response.data);
    if (response.status === 201) {
      this.props.history.push("/accountIndexPage");
    }
  };

  handleIsAccountExist = async () => {
    const { accountNo } = this.state;
    const response = await http.get(`${this.baseUrl}/check/${accountNo}`);
    if (response.status === 200) {
      const { isExist: isAccountExist } = response.data;
      this.setState({ isAccountExist });
    }
  };

  render() {
    const { isAccountExist } = this.state;
    return (
      <div className="card-body border minHeight">
        <div className="offset-2 col-sm-8">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="firstName" className="col-sm-4 col-form-label">
                First Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="FirstName"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lastName" className="col-sm-4 col-form-label">
                Last Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="LastName"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="accountNo" className="col-sm-4 col-form-label">
                A/C No.
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="accountNo"
                  name="accountNo"
                  placeholder=" A/C No."
                  onBlur={this.handleIsAccountExist}
                  onChange={this.handleChange}
                />
                {isAccountExist && (
                  <span className="text-danger">Account Number is already exist!</span>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="balance" className="col-sm-4 col-form-label">
                Balance
              </label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  id="balance"
                  name="balance"
                  placeholder="Balance"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4" />
              <div className="col-sm-8">
                <button className="btn  btn-primary" type="submit" disabled={isAccountExist}>
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default CreateAccountPage;
