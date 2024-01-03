import React from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../userContext'
import { useContext } from 'react'
import OrderComponent from './OrderComponent'
import HomePage from './HomePage'
export default function InPreparation() {
    const {inPreparationOrders,setInPreparationOrders} = useContext(userContext) 
    const nav = useNavigate()

    const showOrders = ()=>
    {
        return inPreparationOrders.map((val)=>
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
