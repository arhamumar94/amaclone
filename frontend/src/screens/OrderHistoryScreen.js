import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector(state => state.orderMineList)
    const {loading,error,orders}=orderMineList
    console.log(orders)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(listOrderMine())

    },[dispatch])
    return (
        <div  className="tablediv">
            <h1>Order History</h1>
            {loading?<LoadingBox></LoadingBox>:
            error?<MessageBox>{error}</MessageBox>:
            (
                <div>
                     <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                        {orders.map((order)=>(
                            
                            <tr key={order._id}>
                                
                                <td data-label="ID">{order._id}</td>
                                <td data-label="DATE">{order.createdAt.substring(0,10)}</td>
                                <td data-label="TOTAL PRICE">{order.totalPrice}</td>
                                <td data-label="PAID">{order.isPaid?order.paidAt.substring(0,10):"No"}</td>
                                <td data-label="DELIVERED">{order.isDelivered?order.deliveredAt.substring(0,10):"No"}</td>
                                <td data-label="ACTION"><button className="small" type="button" 
                                  onClick={()=>{props.history.push(`/order/${order._id}`)}}
                                >Details</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

</div>
               
            )
           
            }

        </div>
    )
}
