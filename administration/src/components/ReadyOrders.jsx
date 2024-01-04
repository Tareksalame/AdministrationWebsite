import React from 'react'
import userContext from '../userContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import HomePage from './HomePage'
import OrderComponent from './OrderComponent'


export default function ReadyOrders() {
    const {ReadyOrders,setReadyOrders} = useContext(userContext) 
    const nav = useNavigate()


 
    const showOrders = ()=>
    {
        return ReadyOrders.map((val)=>
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
