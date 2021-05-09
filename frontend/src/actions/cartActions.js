import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_PAYMENT_METHOD,CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const addToCart=(productId,qty)=>async(dispatch,getState)=>{
    const {data}=await Axios.get(`/api/products/${productId}`)
    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            product:data._id,
            qty,

        }
        

    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))//sare cheeze nhi thi isliye jo state dale gayi
    //vaha se li hum ne information aur save karwa di local mein

}
export const removeFromCart=(productId)=>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:productId
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const saveShippingAddress=(data)=>(dispatch)=>{
    dispatch({type:CART_SAVE_SHIPPING_ADDRESS,payload:data})
    localStorage.setItem('shippingAddress',JSON.stringify(data)) //sare info thi isliye khud hi daal di
//agar sare info ho to getstate kar k jo reducer ne dale hai vaha se mat lo
//getstate() store retrun karta hai
//state bhi store retrun karta hai jab selector meinuse hota hai
}
export const savePaymentMethod=(data)=>(dispatch)=>{
    dispatch({type:CART_SAVE_PAYMENT_METHOD,payload:data})

}