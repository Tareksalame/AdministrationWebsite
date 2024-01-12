import React, { useContext, useEffect, useState } from 'react'
import userContext from '../userContext'
import { useNavigate } from 'react-router-dom'
import OrderComponent from './OrderComponent'
import HomePage from './HomePage'
import notification from '../sounds/352650__foolboymedia__piano-notification-4.mp3'
import swap from '../sounds/364638__zevcuk__whoosh.wav'

export default function OrderManagmentComponent() {
    const {orders,setOrders,counter,setCounter,setInPreparationCounter,setInPreparationOrders} = useContext(userContext) 
    const nav = useNavigate()
    const audioRef = new Audio(notification);


    setTimeout(() => {
        fetch('/GetOrders').then((res)=>{return res.json()}).then((data) => {
            setOrders([...data])
            setCounter(data.length)
        }).catch((err)=>{return err})
    }, 60000);

    const showOrders = ()=>
    {
        return orders.map((val)=>
        {
            return <OrderComponent setOrdersCounter={setCounter} ordersCounter={counter} val={val}/>
        })
    }
    
    useEffect(()=>
    {
            audioRef.play()
            fetch('/GetInPreparationOrders').then((res)=>{return res.json()}).then((data) => {
                setInPreparationOrders([...data])
                setInPreparationCounter(data.length);
            }).catch((err)=>{return err})
    },[counter])

  return (
    <div>
            <HomePage/>
            {showOrders()}
    </div>
  )
}
