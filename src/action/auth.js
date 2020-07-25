import api from "./../service/api";
import {DASHBOARD,LOGIN,LOGIN_USER_FAILED} from "./../action/types";
import history from './../history';
export const Signin = ()=>{
    
    return (dispatch)=>{
      api.post('people')
      .then(function (response) {
        console.log(response);
          if(response.status === 200){
              console.log("hello")
          localStorage.setItem('token', "done")
          dispatch({
            type: LOGIN,
            payload: response.data
          })
        }
        else{
          
          dispatch({
            type: LOGIN_USER_FAILED,
            payload: 'Invalid User Dredentials Details !'
          })
        }
       
        })
      .catch(function (error) {
        console.log(error);
      })
  
    }
  }

  export const Dashboard = ()=>{
    
    return (dispatch)=>{
      api.post('users?page=2')
      .then(function (response) {
        console.log(response);
          if(response.status === 200){
              console.log("hello")
          localStorage.setItem('token', "done")
          dispatch({
            type: DASHBOARD,
            payload: response.data
          })
        }
        else{
          
          dispatch({
            type: DASHBOARD,
            payload: 'Oops Something went Wrong!!!'
          })
        }
       
        })
      .catch(function (error) {
        console.log(error);
      })
  
    }
  }