import React, { Component } from 'react';
import MainContainer from './MainContainer';
import axios from 'axios';
import moment from 'moment';

class Favorites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [{
              userName: '',
              data:[{
                title: "",
                permalink: "", 
                created: "",
                categ:""
              }]
            }]       
        }
      }
    
      componentDidMount() {
          axios.get("http://localhost:8080/oneuser")
          .then(res => {
            if (res.data.length === 0) console.log("User not logged");
            else {
                const user = res.data;
                this.setState({ user });
            }  
          })

      }

  render() {
    return (
        <div>
            {this.state.user.map(red =>
            <MainContainer sidebar = "Favorites" name = {red.userName} >
                <h1 className="page-header">Favorites</h1>
                <table className="table table-striped table-bordered">
                    <tbody>
                         <tr>
                            <td><b>Category</b></td>
                            <td><b>Post</b></td>
                            <td><b>Created</b></td>
                        </tr>

                        {this.state.user.map(red =>
                            red.data.map(user => 
                            <tr>
                                <td>{user.categ}</td>
                                <td><a href={"http://www.reddit.com" + user.permalink}>{user.title}</a></td>
                                {user.title === "" ? <td></td> : <td>{moment.unix(user.created).utcOffset(-720).format("LLLL")}</td>}
                            </tr>
                            )
                        )} 

                    </tbody>
                </table>
            </ MainContainer>
            )}
        </div>

    );
  }
}

export default Favorites;