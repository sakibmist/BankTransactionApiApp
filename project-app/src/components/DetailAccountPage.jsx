import React from  'react';
import http from 'axios';

class DetailAccountPage extends React.Component {
    state={ 
            firstName: '',
            lastName: '',
            accountNo: '',
            balance: '' 
    
    };

    baseUrl = "http://localhost:5000/api/accounts";

    async componentDidMount() {

        const response = await http.get(`${this.baseUrl}`);
        //console.log(response.status);
        if (response.status === 200) {
            const peoples = response.data;
            this.setState({ peoples });
        }
    }

    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    
                </tbody>
            </table>
        );
    }
}
export default DetailAccountPage;