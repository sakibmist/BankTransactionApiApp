import React from 'react';
import http from 'axios';
import { NavLink } from 'react-router-dom';

class AccountIndexPage extends React.Component {
    state = {
        accounts: []
    };

    baseUrl = "http://localhost:5000/api/accounts";

    async componentDidMount() {

        const response = await http.get(this.baseUrl);

        if (response.status === 200) {
            //console.log(response.data);
            const accounts = response.data;
            console.log(accounts);
            this.setState({ accounts });
        }
    };

    handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete?")) {

            const response = await http.delete(`${this.baseUrl}/${id}`);
            if (response.status === 200) {
                const { accounts } = this.state;
                const index = accounts.findIndex(account => account.id === id);
                if (index > -1) {
                    accounts.splice(index, 1);
                    this.setState({ accounts });
                }
            }
        }
    };

    render() {
        const { accounts } = this.state;
        return (
            <div className="card-body border minHeight">
                <div className="">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>LastName</th>
                                <th>A/C No.</th>
                                <th>Balance</th> 
                                <th>Last Tran. Date</th>  
                                <th width="210">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account, index) => (
                                <tr key={index}>
                                    <td>{account.FirstName}</td>
                                    <td>{account.LastName}</td>
                                    <td>{account.AccountNo}</td>
                                    <td>{account.Balance}</td> 
                                    <td>{account.UpdatedAt}</td> 

                                    <td width="210"> 
                                        <button className="btn btn-sm btn-danger ml-2" onClick={() => this.handleDelete(account.id)}>Delete</button>
                                        <NavLink to="" className="btn btn-sm btn-info ml-2">Details</NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default AccountIndexPage;