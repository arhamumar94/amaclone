import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { register } from '../actions/userActions';

export default function RegisterScreen(props) {
  
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        if(confirmPassword!==password)
        {
            alert('Password and confirm Password are not match');
        }
        else{
            dispatch(register(name,email,password));
        }
        
       
    }
    const redirect = props.location.search?props.location.search.split('=')[1] : '/';
    
    const [name ,setName] = useState('')
    const [email ,setEmail] = useState('')
    const [password ,setPassword] = useState('')
    const [confirmPassword ,setConfirmPassword] = useState('')
    const  userRegister = useSelector(state => state.userSignin)
    const {userInfo}=userRegister;
    useEffect(() => {
        //when uservalue change any time this function will run and redirect to shipping page 
        //from above handler
        if(userInfo)
        {
            props.history.push(redirect);
        }
        
       
    }, [props.history,redirect,userInfo])

    return (
        <div>
           
            <div className="form">
            <h1 >Sign Up</h1>
            <form className="form"  onSubmit={submitHandler}>
            

               <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter Name" 
                    required onChange={e=>setName(e.target.value)}></input>

                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter Email" 
                    required onChange={e=>setEmail(e.target.value)}></input>

                </div>
                <div>
                    <label htmlFor="passwrod">Password</label>
                    <input type="passwrod" id="passwrod" placeholder="Enter Passwrod" 
                    required onChange={e=>setPassword(e.target.value)}></input>
                    
                </div>
                <div>
                    <label htmlFor="confirmPasswrod">ConfirmPassword</label>
                    <input type="password" id="confirmPasswrod" placeholder="Confirm Passwrod" 
                    required onChange={e=>setConfirmPassword(e.target.value)}></input>
                    
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have account?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>
         

            </form>
            </div>
        </div>
    )
}
