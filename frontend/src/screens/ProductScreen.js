import React, { useEffect, useState } from 'react'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import Rating from '../components/Rating'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productActions';

export default function ProductScreen(props) {
    const dispatch=useDispatch();
    const productId=props.match.params.id
    const [qty, setQty] = useState(1)
    const productDetails=useSelector((state)=>state.productDetails)
    const {loading,error,product}=productDetails
    
    useEffect(()=>{
        dispatch(detailsProduct(productId));
    },[dispatch,productId]);
    const addToCartHandler=()=>{
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    
    return (

        <div>
        {loading?<LoadingBox/>:
        error?<MessageBox error={error}/>:
        <div>
        <Link to='/'>Back To Result</Link>
       <div className='row top'>
           <div className="col2">
            <img className="large" src={product.image} alt={product.name}></img>
           </div>
           <div className="col1">
               <ul>
                   <li><b>{product.name}</b></li>
                   <li><Rating rating={product.rating} numReviews={product.numReviews}/></li>
                   <li>Price:${product.price}</li>
                   <li>Description:
                       {product.description}</li>
               </ul>

           </div>
           <div className="col1">
               <div className="card card-body">
                   <ul>
                       <li>
                           <div className="row">
                               <div>Price</div>
                               <div className="price">${product.price}</div>
                           </div>
                       </li>
                       <li>
                           <div className="row">
                               <div>Statue</div>
                              {product.countInStock>0?<span className="success">In Stock</span>:
                              <span className="error">Out of Stock</span>
                              }
                           </div>
                       </li>
                       <li>
                           {product.countInStock>0&&(
                           <>
                           
                               <div className="row">
                                   <div>Qty</div>
                                   <div>
                                       <select value={qty} onChange={(e)=>setQty(e.target.value)}>
                                       {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                                  {x + 1}
                                                 </option>
                                                    ))}
                                       </select>
                                   </div>
                               </div>
                           
                           
                               
                               <button onClick={addToCartHandler} className="primary block">Add To Cart</button>
                           
                           </>
                           )
                           }
                       </li>
                   </ul>
               </div>
               
           </div>
       </div>
    </div>
       
        }
         
    </div>




       
    )
}

