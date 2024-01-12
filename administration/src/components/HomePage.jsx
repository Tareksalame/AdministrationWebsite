import React , {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from '../userContext';


export default function HomePage(props) {

    const{ShippingCounter,setShippingCounter,
      ReadyCounter,setReadyCounter,
      InPreparationCounter,setInPreparationCounter,
      counter,setCounter,ReadyOrdersShipping,setReadyOrdersShipping,orders, setOrders,inPreparationOrders,setInPreparationOrders,ReadyOrders,setReadyOrders} = useContext(userContext)

    const nav = useNavigate()

    const fetchOrders = () => {
        fetch('/GetOrders').then((res)=>{return res.json()}).then((data) => {
            setOrders([...data])
            setCounter(data.length)
        }).catch((err)=>{return err})
            nav('/Orders')
      };
      const fetchInPreparationOrders = () => {
        fetch('/GetInPreparationOrders').then((res)=>{return res.json()}).then((data) => {
            setInPreparationOrders([...data])
            setInPreparationCounter(data.length);
        }).catch((err)=>{return err})
            nav('/InPreparationOrders')
      };
      const fetchReadyOrders = () => {
        fetch('/GetReadyOrders').then((res)=>{return res.json()}).then((data) => {
            setReadyOrders([...data])
            setReadyCounter(data.length)
        }).catch((err)=>{return err})
            nav('/ReadyOrders')
      };
      const fetchReadyOrdersShipping = () => {
        fetch('/GetReadyOrdersShipping').then((res)=>{return res.json()}).then((data) => {
            setReadyOrdersShipping([...data])
            setShippingCounter(data.length)
        }).catch((err)=>{return err})
            nav('/ReadyOrdersShipping')
      };



    //   setTimeout(() => {
    //     fetch('/GetOrders').then((res)=>{return res.json()}).then((data) => {
    //         setOrders([...data])
    //         setCounter(data.length)
    //     }).catch((err)=>{return err})
    // }, 10000);

  return (
    <div className='HeaderMenuHomePage'>
    <div className='CountersDiv'>
        <h1 className='counterOrdersFlag'>{counter}</h1>
        <h1 className='counterOrdersFlag'>{InPreparationCounter}</h1>
        <h1 className='counterOrdersFlag' style={{color:'#27ae60'}}>{ReadyCounter}</h1>
        <h1 className='counterOrdersFlag' style={{color:'#27ae60'}}>{ShippingCounter}</h1>
    </div>
    <div className='HeaderButtons'>
        <button onClick={fetchOrders}> الطلبيات</button>
        <button onClick={fetchInPreparationOrders}>قيد التحضير</button>
        <button onClick={fetchReadyOrders}>جاهزة</button>
        <button onClick={fetchReadyOrdersShipping}>للتوصيل</button>
    </div>
    </div>
  )
}
