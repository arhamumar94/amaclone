import { signout } from "../actions/userActions";
import {  USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGIN_FAIL, USER_SIGIN_REQUEST, USER_SIGIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

export const userSigninReducer=(state={},action)=>{
    switch(action.type){
        case USER_SIGIN_REQUEST:
            return {
                loading:true
            }
        case USER_SIGIN_SUCCESS:
            return{
                loading:false,
                userInfo:action.payload
            }
        case USER_SIGIN_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case USER_SIGNOUT:
            return{

            }
        default:
        return state;
    }
}
export const userRegisterReducer=(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {
                loading:true
            }
        case USER_REGISTER_SUCCESS:
            return{
                loading:false,
                userInfo:action.payload
            }
        case USER_REGISTER_SUCCESS:
            return{
                loading:false,
                error:action.payload
            }
        
        default:
        return state;
    }
}
export const userDetailsReducer=(state={loading:true},action)=>{
    switch(action.type)
    {
        case USER_DETAILS_REQUEST:
            return{
                loading:true
            }
        case USER_DETAILS_SUCCESS:
            return{
                loading:false,
                user:action.payload
            }
        case USER_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }

}

export const userUpdateProfileReducer=(state={loading:true},action)=>{
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                loading:true
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case USER_UPDATE_PROFILE_RESET:
            return{
                
            }
        
        default:
            return state;

    }
    

}

