import React from 'react';
import Top from './Top';
import Leftcorner from './Leftcorner';
import {
  BrowserRouter, withRouter, browserHistory, Switch, Route, Link, Redirect,
  useHistory, useLocation
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import {connect} from "react-redux";
import {Dashboard} from "../action/auth";

const pStyle = {
  display: 'block',
  width: '668px',
  height: '320px',
};

const nClass = {
  width: '20%'
}

const cClass = {
  width: '50%'
}

const mClass = {
  width: '40%'
}

const oClass = {
  width: '60%'
}

const pClass = {
  width: '80%'
}






// export default function CircularIndeterminate() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <CircularProgress />
//       <CircularProgress color="secondary" />
//     </div>
//   );
// }


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image:"",users: {}, loggedInStatus: 'Not_Loggged_In', isLoading: true, users: [], error: null, rowcount: 0, databind: '' , currentPage:1}
    if(!localStorage.getItem('Logged_username')){
      this.props.history.push("/")
     } 

  }

 

  handleKeyUp = (event) => {
    const query = event.target.value;
    console.log(query);
    fetch('https://reqres.in/api/planets/?search=' + query)
      .then(response => response.json())
      .then(data => this.setState({
        users: data.results,
        isLoading: false,
      })
      )
      .catch(error => this.setState({ error, isLoading: false }));

  }
  handleChangeCurrentPage = (currentPage) => {
    console.log(currentPage)
    this.setState({currentPage: currentPage});
    this.fetchUsers();
  }

  fetchUsers(id) {
  
    
    
   let apiUrl = 'https://reqres.in/api/users/'+id;
    let self = this;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        
        self.setState({
          users: data.data,
          image:data.data.avatar,
          isLoading: false
        });


      }
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    let param = this.props.match.params.id;
    if(param){
        console.log(param)
        this.fetchUsers(param);
    } else {
        return <Redirect to="/content" />
    }
    
  }


 


  render() {
      
      const {users} = this.state;
      console.log(this.state.image +"image----"+JSON.stringify(this.state))
    return (
      <React.Fragment>
        <Leftcorner />
        <div id="content">
          <Top {...this.props} />

          {console.log(localStorage.getItem('Logged_In'))}
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800"></h1>
              
            </div>
            
            <hr />
           
<div class="card" style={{width:"25rem",background: "#e4f3f7"}}>
    <div class="card-inner"> 
    <img class="img-class" src={users.avatar} alt="Card image cap" />
  <div class="card-body">
    <h5 class="card-title text-center ">Mr. {users.first_name+' '+users.last_name}</h5>
    <p class="card-text text-center text-design">Co-founder & CEO at Bravo Incorporation<br /><span class="service">(it Enabled Services)</span></p>
  </div>
  
  <div class="card-body text-center">
    <a class="card-link">+78990584786</a>
    <a class="card-link">{users.email}</a>
  </div>
  </div>
 
</div>

            
            <div className='dataTables_paginate paging_simple_numbers' id='dataTable_paginate'>
              <ul className='pagination'>
               
                {this.state.databind}
               
              </ul></div>


           
          </div>
        </div></React.Fragment>);

  }
}

const mapStateToProps = ({auth}) =>{
  const {listData} = auth;
  return {listData}
}
export default connect(mapStateToProps,{Dashboard})(Detail);