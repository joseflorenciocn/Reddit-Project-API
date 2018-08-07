import React, { Component } from 'react';
import MainContainer from './MainContainer';


class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
          };
    
        this.insertName = this.insertName.bind(this);
      }
    
      insertName(event) {
        this.setState({userName: event.target.value});
      }

      render() {
        return (
            <div>
               <MainContainer sidebar = "Main" name = {this.props.username}>
                <h1 className="page-header">LogIn</h1>

                    <form method="post">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <input class="form-control" id="userName" name="userName" type="text" placeholder="User Name" required value={this.state.userName} onChange={this.insertName}/>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <input type="submit" formaction="/register" class="btn btn-primary pull-right" value="Register" />
                                <input type="submit" formaction="/login" class="btn btn-success pull-left" value="Login" />
                            </div>
                        </div>
                    </form>
            </MainContainer>
            </div>
    
        );
      }
    }

export default MainScreen;