import React from 'react';
import { homedir } from 'os';


import {connect} from "react-redux";
import {Signin} from "./../action/auth";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Email: 'cerulean',
      Password: '2000',
      error: '',
      loggedIn: false,
    }

    this.Password = this.Password.bind(this);
    this.Email = this.Email.bind(this);
    this.login = this.login.bind(this);
  }

   redClass = {
    'color': 'red'
  }


  Email(event) {
    this.setState({ Email: event.target.value })
  }

  Password(event) {
    this.setState({ Password: event.target.value })
  }

  login(event) {

    if (!this.state.Email) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.Password) {
      return this.setState({ error: 'Password is required' });
    }
    this.setState({ error: '' });
    fetch('https://reqres.in/api/login', {
      method: 'get',
      datatype: 'json',
    }).then((Response) => Response.json())
      .then((result) => {
        var checkeduser = result.data.filter(checkuser => checkuser.name.trim() == this.state.Email.trim() && checkuser.year == this.state.Password);
        if (checkeduser.length == 1) {
          localStorage.setItem("Logged_username", checkeduser[0].name);
          this.props.loginhnadle(result.Status);

        }
        else
          return this.setState({ error: 'Invalid  user' });
      })
     
  }



  render() {
   
    return (
        <React.Fragment>
       
          <div class="container">
            <div class="row">
              <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                  <div class="card-body">
    <h6 class="err-msg">{this.state.error}</h6>
                    <form class="form-signin">
                       <label for="inputEmail">UserName:</label>
                      <div class="form-label-group">
                        <input type="text" id="inputEmail" value={this.state.Email} class="form-control" placeholder="Email address" required autofocus onChange={(e)=>this.setState({Email:e.target.value})} />
                        
                      </div>

                      <label for="inputPassword">Password:</label>
                      <div class="form-label-group">
                        
                        <input type="password" id="inputPassword" value={this.state.Password} class="form-control" placeholder="Password" required onChange={(e)=>this.setState({Password:e.target.value})} />
                        
                      </div>

                      
                     
                      <hr class="my-4" />
                       <div class="col-md-12">
                         <div class="row">
                            
                             <div class="col-md-8"><div class="custom-control custom-checkbox mb-3">
                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                        <label class="custom-control-label" for="customCheck1">Keep me logged In</label>
                      </div></div>
                             <div class="col-md-4"> <a onClick={this.login} className="btn btn-primary btn-user btn-block">
              Sign In
                  </a> </div>
                         </div>
                       </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </React.Fragment>
      );


  }

}

const mapStateToProps = ({auth}) =>{
    const {loggedIn} = auth;
    return {loggedIn}
}
export default connect(mapStateToProps,{Signin})(Login);
