import {DASHBOARD,LOGIN,LOGIN_USER_FAILED} from "./../action/types";

const INIT_DATA = {
    users:null,
    loggedIn:false,
    listData:null
}

export default (state = INIT_DATA,action) =>{
    switch(action.type){
        case LOGIN:
        return {...state,loggedIn:action.payload}

        case DASHBOARD:
        return {...state,listData:action.payload}

        default:
        return state
    }
}
