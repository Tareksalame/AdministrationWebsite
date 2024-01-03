import React, { useContext, useEffect } from 'react'
import userContext from '../userContext'
import { useNavigate } from 'react-router-dom'
import OrderComponent from './OrderComponent'
import HomePage from './HomePage'

export default function OrderManagmentComponent() {
    const {orders,setOrders} = useContext(userContext) 
    const nav = useNavigate()

    const showOrders = ()=>
    {
        return orders.map((val)=>
        {
            return <OrderComponent val={val}/>
        })
    }

  return (
    <div>
            <HomePage/>
            {showOrders()}
    </div>
  )
}
