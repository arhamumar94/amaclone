import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addToCart, removeFromCart} from '../actions/cartActions'
import {Link} from 'react-router-dom'
import MessageBox  from '../components/MessageBox'

export default function CartScreen(props) {
    const cart=useSelector(state=> state.cart);
    const {cartItems}=cart;
   
   
    const productId=props.match.params.id;
    const qty=props.location.search?Number(props.location.search.split('=')[1]):1;
 
   const dispatch=useDispatch()
    
   useEffect(() => {
    if(productId)
    {
        dispatch(addToCart(productId,qty))
    }
   
}, [dispatch,productId,qty])
const removeFromCartHandler=(id)=>{
    
    dispatch(removeFromCart(id))
    //implelment
}
const checkoutHandler=()=>{
    props.history.push('/signin?redirect=shipping')
}
    
    return (
        <div className="row top">
            <div className="col2">
                <h1>Shopping Cart</h1>
                {cartItems.length===0?<MessageBox>CART is EMPTY. <Link to="/">Go Shopping</Link></MessageBox>:
                (
                    <ul>
                        
                        {cartItems.map((item)=>(
                            
                            <li key={item.product}>
                                <div className="row colour">
                                    <div>
                                        <img src={item.image} className='small'></img>
                                    </div>
                                    <div className="min-39">
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        <select value={item.qty} onChange={e=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                                  {x + 1}
                                                 </option>
                                                    ))}
                                        </select>
                                    </div>
                                    <div><b>${item.price}</b></div>
                                    <div>
                                        <button onClick={()=>removeFromCartHandler(item.product)}>Delete</button>
                                    </div>
                                </div>
                            </li>
                            
                        ))}
                    </ul>
                )
                }
            </div>
            <div className='col1'>
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Subtotal:({cartItems.reduce((a,c)=>a+c.qty,0)}) items:$ {cartItems.reduce((a,c)=>a+(c.price)*(c.qty),0)}</h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className='primary block' disabled={cartItems.length===0}>
                                Proceed to Chevkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
          
        </div>
    )
}
