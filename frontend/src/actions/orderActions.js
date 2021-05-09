import Axios from "axios"
import { CART_EMPTY } from "../constants/cartConstants"
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER__DETAILS_FAIL } from "../constants/orderConstants"

export const createOrder=(order)=>async(dispatch,getState)=>{
     dispatch({type:ORDER_CREATE_REQUEST,payload:order})
     try {
         const {userSignin:{userInfo}} =getState()
         console.log(userInfo)
         const {data}=await Axios.post('http://localhost:5000/api/order',order,{
             headers:{
                 Authorization:`Bearer ${userInfo.token}`
             }
         })
         dispatch({type:ORDER_CREATE_SUCCESS,payload:data.order})
         dispatch({type:CART_EMPTY})
         localStorage.removeItem('cartItems')
         
     } catch (error) {
         dispatch({type:ORDER_CREATE_FAIL,payload:error.response&& error.response.data.message?
            error.response.data.message:error.message})
         
     }

}

export const detailsOrder=(orderId)=>async(dispatch,getState)=>{
    const {userSignin:{userInfo}}=getState();
    dispatch({type:ORDER_DETAILS_REQUEST,payload:orderId})
    try {
              const {data}=await Axios.get(`/api/order/${orderId}`,{
                  headers:{
                      Authorization:`Bearer ${userInfo.token}`
                  }
              })
              dispatch({type:ORDER_DETAILS_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:ORDER__DETAILS_FAIL,payload:error.response&& error.response.data.message?
            error.response.data.message:error.message})
        
    }


}
export const listOrderMine=()=>async(dispatch,getState)=>{
    dispatch({type:ORDER_MINE_LIST_REQUEST})
    const {userSignin:{userInfo}}=getState();
    try {
        const {data}=await Axios.get('/api/order/mine',{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:ORDER_MINE_LIST_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:ORDER_MINE_LIST_FAIL,payload:error.response&& error.response.data.message?
            error.response.data.message:error.message})
        
    }


}