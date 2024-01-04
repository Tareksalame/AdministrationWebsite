import React from 'react'
import userContext from '../userContext'
import { useContext } from 'react'
import HomePage from './HomePage'
import { useNavigate } from 'react-router-dom'
import OrderComponent from './OrderComponent'


export default function ReadyOrdersShipping() {
    const {ReadyOrdersShipping,setReadyOrdersShipping} = useContext(userContext) 
    const nav = useNavigate()


 
    const showOrders = ()=>
    {
        return ReadyOrdersShipping.map((val)=>
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
