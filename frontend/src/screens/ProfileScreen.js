import React, { useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import  LoadingBox from  '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {detailsUser, updateUserProfile} from '../actions/userActions'
import { useState } from 'react';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen(props) {
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo}=userSignin
    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user}=userDetails;
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type:USER_UPDATE_PROFILE_RESET})
        dispatch(detailsUser(userInfo._id))       
    }, [dispatch,userInfo._id])
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password!==confirmPassword)
        {
            alert('Password and Confirm Password Not same')
        }
        else{
            dispatch(updateUserProfile({userId:user._id,
            name,email,password
            }))
            props.history.push('/')
            
        }
    

        //todo
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
               <div><h1>User Profile</h1></div>
               
               {loading?<LoadingBox></LoadingBox>:
                   error?<MessageBox>{error}</MessageBox>:
                <>
                      <div>
                          <label htmlFor="name">Name</label>
                          <input id="name" type="text" required placeholder="Enter Name"
                           value={name} onChange={(e)=>setName(e.target.value)} ></input>
                      </div>
                      <div>
                          <label htmlFor="email">Email</label>
                          <input id="email" type="email" required placeholder="Enter Email"
                           value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
                      </div>
                      <div>
                          <label htmlFor="password">Password</label>
                          <input id="password" type="password" required placeholder="Enter Password"
                           value={password} onChange={(e)=>setPassword(e.target.value)} ></input>
                      </div>
                      <div>
                          <label htmlFor="confirmPassword">Confirm Password</label>
                          <input id="confirmPassword" type="password" required placeholder="Enter Password"
                           value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                      </div>
                      <div>
                          <label></label>
                          <button type="submit" className="primary">Update</button>
                      </div>
                </>
                }
               
            </form>
        </div>
    )
}
