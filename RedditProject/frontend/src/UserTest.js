import React, { Component } from 'react';
import MainContainer from './MainContainer';
import axios from 'axios';

class UserTest extends Component {

    state = {
        reddit: [],
        users: [],
        user: [],
        connected: false   
      }
    
      componentDidMount() {
          axios.get("http://localhost:8080/users")
          .then(res => {
            const reddit = res.data;
            //console.log("1");
            //console.log(reddit);
            this.setState({ reddit });
          })

          axios.get("http://localhost:8080/users")
          .then(res => {
            const users = res.data.data;
           // console.log("2");
           // console.log(users);
            this.setState({ users });
          })

          axios.get("http://localhost:8080/oneuser")
          .then(res => {
            const user = res.data;
           // console.log("3");
            if (user.length === 0) console.log("Teste1");
            else console.log("Teste2");
            console.log(user);
            this.setState({ user });
          })

      }

      logged(login) {
          if (login) return <td><b>Like</b></td>
      }

  render() {
    return (
        <div>
            <MainContainer sidebar = "New" >
                <h1 className="page-header">New Posts</h1>
                <table className="table table-striped table-bordered">
                    <tbody>
                         <tr>
                            <td><b>Post</b></td>
                            <td><b>Created</b></td>
                            {this.logged(this.state.connected)}
                        </tr>

                        {this.state.reddit.map(red =>
                        <tr>                            
                            <td>{red.userName}</td>
                        </tr>
                        )}
                    </tbody>
                </table>

                        {/*this.state.reddit.map(red =>
                            red.data.map(user =>
                            <p>{user.title}</p>
                            )
                        )

                        {this.state.user.map(red =>
                            red.data.map(user =>
                            <p>{user.title}</p>
                            )
                        )}
                        */}

            </ MainContainer>
        </div>

    );
  }
}

export default UserTest;