import Axios from "axios"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGIN_FAIL, USER_SIGIN_REQUEST, USER_SIGIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"

export const register=(name,email,password)=>async(dispatch)=>{
    console.log('hey',name)
    
    dispatch({type:USER_REGISTER_REQUEST,payload:{name,email,password}})
    try {
        console.log('here')
        const { data } = await Axios.post('http://localhost:5000/api/user/register', {
            name,
            email,
            password,
          });
        console.log(data);
        //Data base dalwane k saath store mein bhi dal wa diy jaha se hum check karte hai
        dispatch({type:USER_REGISTER_SUCCESS,payload:data}) //ye databse mein dal wayega
        dispatch({type:USER_SIGIN_SUCCESS,payload:data}) //ye store mein dalwayega
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        console.log('here2')
        console.log(error.response.data.message)
        dispatch({type:USER_REGISTER_FAIL,payload:error.response&& error.response.data.message?
            error.response.data.message:error.message})
        
    }
}
  
export const signIn=(email,password)=>async(dispatch)=>{
    
    dispatch({type:USER_SIGIN_REQUEST,payload:{email,password}})
    try {
        const {data}=await Axios.post('http://localhost:5000/api/user/signin',{email,password})
        console.log(data);
        dispatch({type:USER_SIGIN_SUCCESS,payload:data})
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
       
        dispatch({type:USER_SIGIN_FAIL,payload:error.response&& error.response.data.message?
            error.response.data.message:error.message})
           
        
    }
}
export const signout=()=>(dispatch)=>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    dispatch({type:USER_SIGNOUT})
}
export const detailsUser=(userId)=>async(dispatch,getState)=>{
    dispatch({type:USER_DETAILS_REQUEST})
    const {userSignin:{userInfo}}=getState()
    try {
        const {data}=await Axios.get(`api/user/${userId}`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:USER_DETAILS_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:USER_DETAILS_FAIL,payload:error.response&& error.response.data.message?
            error.response.data.message:error.message})
        
    }

}

export const updateUserProfile=(user)=>async(dispatch,getState)=>{
         dispatch({type:USER_UPDATE_PROFILE_REQUEST})
         const {userSignin:{userInfo}}=getState()
         try {
          
             const {data}=await Axios.put('http://localhost:5000/api/user/profile',user,{
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
             })
            
             dispatch({type:USER_UPDATE_PROFILE_SUCCESS,payload:data})
             dispatch({type:USER_SIGIN_SUCCESS,payload:data})
             localStorage.setItem('userInfo',JSON.stringify(data))
             
         } catch (error) {
            dispatch({type:USER_UPDATE_PROFILE_FAIL,payload:error.response&& error.response.data.message?
                error.response.data.message:error.message})
         }

}
