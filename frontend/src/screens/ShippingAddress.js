import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddress(props) {
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo}=userSignin;
    const cart = useSelector(state => state.cart)
    const {shippingAddress}=cart;
    if(!userInfo)
    {
        props.history.push('/sigin')
    }
    const [fullName,setFullName]=useState(shippingAddress.fullName)
    const [address,setAddress]=useState(shippingAddress.address)
    const [city,setCity]=useState(shippingAddress.city)
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const [country,setCountry]=useState(shippingAddress.country)
    const dispatch=useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        //todo
        dispatch(saveShippingAddress({fullName,address,city,postalCode,country}))
        props.history.push('/payment')
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
            <h1>Shipping Address</h1>
                <div>
                    <label className="fullName">Full Name</label>
                    <input type="text" id='fullName' placeholder="Enter Full Name" value={fullName}
                    onChange={e=>setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label className="address">Address</label>
                    <input type="text" id='address' placeholder="Enter Address" value={address}
                    onChange={e=>setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label className="city">City</label>
                    <input type="text" id='city' placeholder="Enter City" value={city}
                    onChange={e=>setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label className="postalCode">Postal-Code</label>
                    <input type="text" id='postalCode' placeholder="Enter PostalCode" value={postalCode}
                    onChange={e=>setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <label className="country">Country</label>
                    <input type="text" id='country' placeholder="Enter Country" value={country}
                    onChange={e=>setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">Continue</button>
                </div>

            </form>
        </div>
    )
}
