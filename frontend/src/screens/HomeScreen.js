import React, { useEffect} from 'react'

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {listProducts} from '../actions/productActions'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux';
export default function HomeScreen() {
    const dispatch=useDispatch()
    const productList=useSelector(state => state.productList)
    const {loading,products,error}=productList
    useEffect(() => {
       
        
          
       dispatch(listProducts())



    }, [dispatch])
    return (
        <div>
            {loading?<LoadingBox/>:
            error?<MessageBox error={error}/>:

            <div  className="row center">
             {
               products.map((product)=>(
                   <Product key={product._id} product={product}/>
               ))
             } 
             </div>

            }
             


        </div>
    )
}
