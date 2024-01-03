import React , {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from '../userContext';


export default function HomePage() {

    const{orders, setOrders,inPreparationOrders,setInPreparationOrders} = useContext(userContext)

    const nav = useNavigate()

    const fetchOrders = () => {
        fetch('/GetOrders').then((res)=>{return res.json()}).then((data) => {
            setOrders([...data])
        }).catch((err)=>{return err})
            nav('/Orders')
      };
      const fetchInPreparationOrders = () => {
        fetch('/GetInPreparationOrders').then((res)=>{return res.json()}).then((data) => {
            setInPreparationOrders([...data])
        }).catch((err)=>{return err})
            nav('/InPreparationOrders')
      };



  return (
    <div className='HeaderMenuHomePage'>
        <button onClick={fetchOrders}>الطلبيات</button>
        <button onClick={fetchInPreparationOrders}>قيد التحضير</button>
    </div>
  )
}
