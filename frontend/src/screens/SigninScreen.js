import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { signIn } from '../actions/userActions';

export default function SigninScreen(props) {
  
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
       dispatch(signIn(email,password));

    }
    const redirect =props.location.search?props.location.search.split('=')[1]:'/'
    const [email ,setEmail] = useState('')
    const [password ,setPassword] = useState('')
    const  userSignin = useSelector(state => state.userSignin)
    const {userInfo}=userSignin;
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
            <h1 >Sign In</h1>
            <form className="form"  onSubmit={submitHandler}>
            
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
                    <label/>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label/>
                    <div>
                        New customer?{' '}
                        <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
         

            </form>
            </div>
        </div>
    )
}
