import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SideBar extends Component {
 
 //   handlelogin(){
 //      if (this.props.islogged) return <li className={(this.props.highlight === "Login" ? "active" : '')}><Link to="/">Login</Link></li>;
  //      else return <li className={(this.props.highlight === "History" ? "active" : '')}><Link to="/history">History</Link></li>;
  //  }


  render() {
    return (
    <div>
        <div className="col-sm-3 col-md-2  sidebar">
            <ul className="nav nav-sidebar">     
               {/*this.handlelogin()*/}
                <li className={(this.props.highlight === "Main" ? "active" : '')}><Link to="/">Main</Link></li>
                <li className={(this.props.highlight === "Favorites" ? "active" : '')}><Link to="/favorites">Favorites</Link></li>
                <li className={(this.props.highlight === "Best" ? "active" : '')}><Link to="/best">Best</Link></li>
                <li className={(this.props.highlight === "Hot" ? "active" : '')}><Link to="/hot">Hot</Link></li>
                <li className={(this.props.highlight === "New" ? "active" : '')}><Link to="/new">New</Link></li>
                <li className={(this.props.highlight === "Controversial" ? "active" : '')}><Link to="/controversial">Controversial</Link></li>
                <li className={(this.props.highlight === "Top" ? "active" : '')}><Link to="/top">Top</Link></li>
                <li className={(this.props.highlight === "Rising" ? "active" : '')}><Link to="/rising">Rising</Link></li>    
            </ul>
        </div>
    </div>
    );
  }
}

export default SideBar;