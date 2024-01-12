import React from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../userContext'
import { useContext ,useEffect } from 'react'
import OrderComponent from './OrderComponent'
import HomePage from './HomePage'
export default function InPreparation() {
    const {setShippingCounter,setReadyOrdersShipping,setReadyOrders,setReadyCounter,inPreparationOrders,setInPreparationOrders} = useContext(userContext) 
    const nav = useNavigate()

    const showOrders = ()=>
    {
        return inPreparationOrders.map((val)=>
        {
            return <OrderComponent val={val}/>
        })
    }

    useEffect(()=>
    {
            fetch('/GetReadyOrders').then((res)=>{return res.json()}).then((data) => {
              setReadyOrders([...data])
              setReadyCounter(data.length)
          }).catch((err)=>{return err})
          fetch('/GetReadyOrdersShipping').then((res)=>{return res.json()}).then((data) => {
            setReadyOrdersShipping([...data])
            setShippingCounter(data.length)
          }).catch((err)=>{return err})
    },[inPreparationOrders])

  return (
    <div>
            <HomePage/>
            {showOrders()}
    </div>
  )
}
