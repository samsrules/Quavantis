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


class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: "check", loggedInStatus: 'Not_Loggged_In', isLoading: true, users: [], error: null, rowcount: 0, databind: '' , currentPage:1}
   
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

  fetchUsers() {
    let currentPage = this.state.currentPage;
    let apiUrl = 'https://reqres.in/api/users';
    if(currentPage !=1) {
      apiUrl = 'https://reqres.in/api/users?page='+currentPage;
    }
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.createPagination(data.data.count);
        this.setState({
          users: data.data,
          isLoading: false,
          rowcount: data.data.count,
          databind: this.createPagination(data.data.count)
        });


      }
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }


  createPagination = (count) => {
    let data = [];
    for (let i = 1; i <= 3; i++) {
      let element = <li  onClick={(e) => this.handleChangeCurrentPage(i)} className='paginate_button page-item '><a href='#' aria-controls='dataTable' data-dt-idx='6' tabindex='0' className='page-link'>{i}</a></li>;
      data.push(element)
     
    }
    return data;
    console.log(data);

  }


  render() {
    const classes = makeStyles(theme => ({
      root: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
    }));

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
            <div className="row">
              {!this.state.isLoading ? (
                this.state.users.map((user, i) => {
                  console.log(user);
                  return (
                    <div key={i} className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                             <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{user.first_name}</div>
                              <div  className="text-xs font-weight-bold text-danger text-uppercase mb-1">  <Link to={"detail/"+user.id} ><img src={user.avatar} width="50" height="50"></img></Link></div>
                              
                            </div>
                          
                          </div>
                        </div>
                      </div>
                    </div>);
                })
              ) : (
              
                <CircularProgress color="secondary" />
                )}

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
export default connect(mapStateToProps,{Dashboard})(Content);