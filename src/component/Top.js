import React from 'react';
import Content from './Content'
import {
  BrowserRouter as Router, withRouter, browserHistory, Switch, Route, Link, Redirect,
  useHistory, useLocation
} from "react-router-dom";
class Top extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    if(!localStorage.getItem('Logged_username')){
      this.props.history.push("/")
     } 
  }


  logout(event) {
    localStorage.clear();
    this.props.history.push('/');
    this.setState({ loggedInStatus: "Not_Loggged_In" });
    localStorage.setItem('Logged_In',"Not_Loggged_In");
    console.log(localStorage.getItem('Logged_In'));
    localStorage.clear();


  }


  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
     <p>{localStorage.getItem("Logged_username")}</p>
        

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-search fa-fw"></i>
              <p>{localStorage.getItem("Logged_username")}</p>
            </a>
            
          </li>
        
         
          <div className="topbar-divider d-none d-sm-block"></div>
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="javascript:void(0)" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span onClick={this.logout} className="mr-2 d-none d-lg-inline text-gray-600 small">Logout</span> <p></p>
            
            </a>
           
          </li>
        </ul>
      </nav>);
  }

}

export default Top;