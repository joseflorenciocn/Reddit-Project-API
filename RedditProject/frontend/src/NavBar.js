import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {

  

  logged(){
    var cong = "- Welcome ";
    if (this.props.title !== "") return cong+this.props.title;
    else return "";
  }

  render() {
    return (
      
    <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Reedit App {this.logged()}</Link>
            </div>
          </div>
        </nav>
    </div>
   );
}
}

export default NavBar;