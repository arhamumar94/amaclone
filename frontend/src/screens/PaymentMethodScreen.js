import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'
export default function PaymentMethodScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart;
    console.log(shippingAddress)
    if(!shippingAddress)
    {
        props.history.push('/shipping')

    }
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')

    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className='form'onSubmit={submitHandler}>
            <h1>Payment</h1>
               
                <div>
                    <div className='line'>
                    <input type="radio" id="paypal" required checked value="PayPal"
                    name="paymentMethod"
                    onChange={(e)=> setPaymentMethod(e.target.value)}></input>
                    <label className='noblock' htmlFor="paypal"><b>PayPal</b></label>
                    </div>

                </div>
                <div>
                    
                   <div className="line">
                   <input type="radio" id="stripe" required checked value="Stripe"
                    name="paymentMethod"
                    onChange={(e)=> setPaymentMethod(e.target.value)}></input>
                    <label className='noblock'htmlFor="stripe"><b>Stripe</b></label>
                   </div>

                </div>
                <div>
                    <button type="submit" className="primary">Continue</button>
                </div>
            </form>
        </div>
    )
}
