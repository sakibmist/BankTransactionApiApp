import React from 'react';
import http from 'axios';

class AccountOperationPage extends React.Component {

    state = { 
        accountNo: '',
        transactionMode: '',
        amount: ''  
};

baseUrl = "http://localhost:5000/api/accounts";

handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
    //console.log(this.state);
};

handleSubmit = async (event) => {
    event.preventDefault();
    const {firstName,lastName,accountNo,balance } = this.state;
    const response = await http.post(this.baseUrl,{firstName,lastName,accountNo,balance});
    console.log(response.data);
    if (response.status === 201) {
        this.props.history.push('/accountIndexPage');
    }
};
    render() {
        return (
            <div className="card-body border minHeight">
                <div className="offset-2 col-sm-8">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="accountNo" className="col-sm-4 col-form-label">
                                A/C No.
                            </label>
                            <div className="col-sm-8">
                                <select name="accountNo" id="accountNo" className="form-control"  onChange={this.handleChange} >
                                    <option value="">--Select One--</option>
                                    <option value="">75245</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="lname" className="col-sm-4 col-form-label">
                                Transaction Mode
                            </label>
                            <div className="col-sm-8">
                                <select name="transactionMode" id="transactionMode" className="form-control"  onChange={this.handleChange}  >
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
                                    id="number"
                                    name="number"
                                    placeholder=""
                                    onChange={this.handleChange} 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-8">
                                <button className="btn  btn-primary" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default AccountOperationPage;