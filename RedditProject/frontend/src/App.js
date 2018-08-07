/*********************************************************************************
*  React App 
*  Name: Jose Florencio Coelho Neto Student  Date: 05/08/2018
*
********************************************************************************/ 


import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Favorites from './Favorites';
import Best from './Best';
import Hot from './Hot';
import Top from './Top';
import New from './New';
import Controversial from './Controversial';
import Rising from './Rising';
import NotFound from './NotFound';
import UserTest from './UserTest';
import MainScreen from './MainScreen';
import axios from 'axios';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        user: [{
          userName: '',
          data:[{
            title: "",
            permalink: "", 
            created: "",
            categ: ""
          }]
        }]       
    }
  }

  componentDidMount() {
      axios.get("http://localhost:8080/oneuser")
      .then(res => {
        const user = res.data;
        console.log(user);
        if (res.data.length ===0) console.log("User not logged");
            else {
                const user = res.data;
                this.setState({ user });
            }        
      })

  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <MainScreen username = ''/>
        )}/>

        <Route exact path='/favorites' render={() => (
          <Favorites username = ''/>
        )}/>
  
        <Route exact path='/best' render={() => (
          <Best username = {this.state.user[0].userName}/> 
        )}/>
        
        <Route exact path='/hot' render={() => (
          <Hot username = {this.state.user[0].userName}/>
        )}/>

        <Route exact path='/top' render={() => (
          <Top username = {this.state.user[0].userName}/>
        )}/>

        <Route exact path='/new' render={() => (
          <New username = {this.state.user[0].userName}/>
        )}/>

        <Route exact path='/controversial' render={() => (
          <Controversial username = {this.state.user[0].userName}/>
        )}/>
      
        <Route exact path='/rising' render={() => (
          <Rising username = {this.state.user[0].userName}/>
        )}/>

        <Route exact path='/users' render={() => (
          <UserTest />
        )}/>
        
        {/*}
        <Route path='*' render={() => (
          <NotFound />
        )}/>
      */}


      </Switch>
    );
  }
}

export default App;