import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import {Link} from 'react-router-dom'
import { createOrder, detailsOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import  LoadingBox from  '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


export default function OrderScreen(props) {
   
   const dispatch =useDispatch();
   const orderId=props.match.params.id;
   const orderDetails=useSelector(state=>state.orderDetails)
   const {order,loading,error}=orderDetails
   
    useEffect(() => {
      dispatch(detailsOrder(orderId))
       
    }, [dispatch,orderId])
    return loading?(<LoadingBox></LoadingBox>):
    error?(<MessageBox>{error}</MessageBox>):
     (
        <div>
           <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h1>Shipping</h1>
                                <p>
                                    <strong>Name:</strong>{order.shippingAddress.fullName} <br></br>
                                    <strong>Address:</strong>{order.shippingAddress.address},
                                    {order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}

                                </p>
                                {order.isDelivered?<MessageBox><strong>Delivered at {order.deliveredAt}</strong></MessageBox>:
                                <MessageBox><strong>Not Delivered</strong></MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h1>Payment</h1>
                                <p>
                                    <strong>Method:</strong>{order.paymentMethod} 
                                </p>
                                {order.isPaid?<MessageBox><strong>Paid at {order.paidAt}</strong></MessageBox>:
                                <MessageBox><strong>Not Paid</strong></MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h1>Order Items</h1>
                                <ul>
                        
                        {order.orderItems.map((item)=>(
                            
                            <li key={item.product}>
                                <div className="row colour">
                                    <div>
                                        <img src={item.image} className='small'></img>
                                    </div>
                                    <div className="min-39">
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </div>
                                   
                                    <div><b>{item.qty} x ${item.price}=${item.qty*item.price}</b></div>
                                   
                                </div>
                            </li>
                            
                        ))}
                    </ul>
                               </div>
                        </li>
                    </ul>

                </div>
              

            
                <div className="col1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                           
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
