import React, { useContext, useEffect, useState } from 'react'
import userContext from '../userContext'
import { useNavigate } from 'react-router-dom'
import OrderComponent from './OrderComponent'
import HomePage from './HomePage'
import notification from '../sounds/352650__foolboymedia__piano-notification-4.mp3'
import swap from '../sounds/364638__zevcuk__whoosh.wav'

export default function OrderManagmentComponent() {
    const {orders,setOrders} = useContext(userContext) 
    const [counter,setCounter] = useState(orders.length)
    const nav = useNavigate()
    const audioRef = new Audio(notification);


    setTimeout(() => {
        fetch('/GetOrders').then((res)=>{return res.json()}).then((data) => {
            setOrders([...data])
        }).catch((err)=>{return err})
        if(orders.length > counter)
        {
            setCounter(orders.length)
            audioRef.play()
        }
    }, 10000);

    const showOrders = ()=>
    {
        return orders.map((val)=>
        {
            return <OrderComponent setOrdersCounter={setCounter} ordersCounter={counter} val={val}/>
        })
    }
    
    // useEffect(()=>
    // {
    //     audioRef.play()
    // },[counter])

  return (
    <div>
            <HomePage/>
            {showOrders()}
    </div>
  )
}
