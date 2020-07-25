import React from 'react';
import Login from './Login';
import Users from './Content';


class Home extends React.Component {

   constructor(props) {
       super(props);
       this.state = {loggedInStatus : "Loggged_In",users : "check" }
       this.loginhnadle = this.loginhnadle.bind(this);
  }

  loginhnadle(data){
     
      this.props.history.push({
      pathname: '/content',
      state: { loggedInStatus: "Loggged_In" }
       })
       localStorage.setItem('Logged_In',"Logged_In");
    }

  render() {
    return ( <React.Fragment><Login {...this.props} loginhnadle={this.loginhnadle} /> </React.Fragment>);
  }
}

export default Home;     