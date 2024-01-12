import React, { useState } from 'react'
import { useContext } from 'react';
import userContext from '../userContext';
import waze from '../images/wazeicon.png';
import swap from '../sounds/364638__zevcuk__whoosh.wav'


export default function OrderComponent(props) {
    const[flag,setFlag] = useState(false);
    const {InPreparationCounter,setInPreparationCounter,setReadyCounter,setShippingCounter,
        counter,setCounter,orders,setOrders,setInPreparationOrders,setReadyOrders,setReadyOrdersShipping} = useContext(userContext) 
    const[display,setDisplay] = useState('none')
    const[ShowRelease,setShowRelease] = useState('تفاصيل الطلبية')
    const PhoneNumberLink = 'tel:' + props.val.phoneNumber
    const audioSwap = new Audio(swap);
    
    const showDetails = ()=>
    {
        if(flag === false)
        {
            setFlag(!flag)
            setDisplay('flex')
            setShowRelease("إخفاء التفاصيل")
        }
        else
        {
            setFlag(!flag)
            setDisplay('none')
            setShowRelease("تفاصيل الطلبية")

        }
    }

    const openInWaze = () => {
        if (props.val.Location) {
          const url = `https://waze.com/ul?ll=${props.val.Location.latitude},${props.val.Location.longitude}&navigate=yes`;
          window.open(url, '_blank');
        }
      };

    const DetailsOfCart = ()=>
    {
          // Use filter to exclude items with count equal to 0
        const filteredCart = props.val.Cart.filter((val) => val.count !== 0);

        return filteredCart.map((val)=>
        {
            return <div className='CartNamePriceAddDiv'>
                <div className='NamePriceCountRowDiv'><h2>الوجبة</h2><h3>{val.name}</h3> </div>
                <div className='NamePriceCountRowDiv'><h2>عدد</h2>--------------<h3>{val.count}</h3> </div>
                <div className='NamePriceCountRowDiv'><h2>سعر للوجبة</h2><h3>{val.price}</h3> </div>
                <div style={{width:'100%'}}>
                {val.additions.map((addition)=>
                {
                    if(addition.YesNo === '/static/media/No.c5641ec1eb969a905842.png')
                    {
                    return <div className='AdditionsDiv'>
                        <h4 style={{textDecoration:'line-through',color:'#e67e22'}}>{addition.add}</h4>
                        <h3 style={{textDecoration:'line-through',color:'#e67e22'}}>بدون</h3>
                    </div>
                    }
                    else
                    {
                        return <div className='AdditionsDiv'>
                        <h4 style={{color:'#27ae60'}}>{addition.add}</h4>
                        <h3 style={{color:'#27ae60'}}>مع</h3>
                    </div>
                    }
                })}
                </div>

            </div>
        })
    }
    const OrderStatusShow= ()=>
    {
        if(props.val.OrderStatus === 'Pending')
        {
            return <h2 style={{fontSize:'25',color:'#e67e22',marginLeft:'0px',marginBottom:'3%'}}>الطلبية في الانتظار</h2>
        }
        else if(props.val.OrderStatus === 'In Preparation')
        {
            return <h2 style={{fontSize:'25',color:'#e67e22',marginLeft:'0px',marginBottom:'3%'}}>الطلبية قيد التحضير</h2>
        }
        else if(props.val.OrderStatus === 'Ready')
        {
            return <h2 style={{fontSize:'25',color:'#27ae60',marginLeft:'0px',marginBottom:'3%'}}>الطلبية جاهزة</h2>
        }
    }


    const StartPrepare = ()=>
    {
        audioSwap.play()
        fetch('/StartPrepare', 
            {
                headers:{
                    "Content-Type": "application/json"
                },
                method:'post',
                body:JSON.stringify({
                    name:props.val.name,
                    phoneNumber: props.val.phoneNumber,
                    City: props.val.City,
                    OrderNumber:props.val.OrderNumber,
                    OrderStatus:'In Preparation'
                })
            }).then((res)=>{return res.json()})
            .then((data)=>
            {
                if(data ==='Order not found')
                {
                    alert('الطلبية غير موجودة')
                }
                else
                {
                    fetch('/GetOrders').then((res)=>{return res.json()}).then((data) => {
                        setOrders([...data])
                        setCounter(data.length)
                    }).catch((err)=>{return err})
                }
            }).catch((err)=>{return err})
    }

    
    const OrderIsReady = ()=>
    {
        fetch('/OrderIsReady', 
            {
                headers:{
                    "Content-Type": "application/json"
                },
                method:'post',
                body:JSON.stringify({
                    OrderNumber:props.val.OrderNumber,
                    OrderStatus:'Ready'
                })
            }).then((res)=>{return res.json()})
            .then((data)=>
            {
                if(data ==='Order not found')
                {
                    alert('الطلبية غير موجودة')
                }
                else
                {
                    fetch('/GetInPreparationOrders').then((res)=>{return res.json()}).then((data) => {
                        setInPreparationOrders([...data])
                        setInPreparationCounter(data.length)
                    }).catch((err)=>{return err})
                }
            }).catch((err)=>{return err})
    }


    const DeliveredOrder = ()=>
    {
        fetch('/DeliveredOrder', 
            {
                headers:{
                    "Content-Type": "application/json"
                },
                method:'post',
                body:JSON.stringify({
                    OrderNumber:props.val.OrderNumber,
                    OrderStatus:'Delivered'
                })
            }).then((res)=>{return res.json()})
            .then((data)=>
            {
                if(data ==='Order not found')
                {
                    alert('الطلبية غير موجودة')
                }
                else
                {
                    fetch('/GetReadyOrders').then((res)=>{return res.json()}).then((data) => {
                        setReadyOrders([...data])
                        setReadyCounter(data.length)
                    }).catch((err)=>{return err})
                }
            }).catch((err)=>{return err})
    }


    const DeliveredOrderShipping = ()=>
    {
        fetch('/DeliveredOrder', 
            {
                headers:{
                    "Content-Type": "application/json"
                },
                method:'post',
                body:JSON.stringify({
                    OrderNumber:props.val.OrderNumber,
                    OrderStatus:'Delivered'
                })
            }).then((res)=>{return res.json()})
            .then((data)=>
            {
                if(data ==='Order not found')
                {
                    alert('الطلبية غير موجودة')
                }
                else
                {
                    fetch('/GetReadyOrdersShipping').then((res)=>{return res.json()}).then((data) => {
                        setReadyOrdersShipping([...data])
                        setShippingCounter(data.length)
                    }).catch((err)=>{return err})
                }
            }).catch((err)=>{return err})
    }


    const inPreparation =()=>
    {
        if(props.val.OrderStatus === 'Pending')
        {
            return <button className='PendingInPreparationButtons' onClick={StartPrepare}>
                بدء التحضير
            </button>
        }
        else if(props.val.OrderStatus === 'In Preparation')
        {
            return <button onClick={OrderIsReady} style={{fontSize:'15px'}} className='PendingInPreparationButtons'>
                الطلبية جاهزة
            </button>
        }
        else if(props.val.OrderStatus === 'Ready' && props.val.TakeAwayOrShipping === 'shipping')
        {
            return <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:'50%'}}>
                <button onClick={DeliveredOrderShipping}  style={{fontSize:'15px',height:'60px'}} className='PendingInPreparationButtons'>
                تم تسليم الطلبية
            </button>
             <button onClick={openInWaze} style={{width:'60px',height:'60px',padding:'2%'}} className='PendingInPreparationButtons'>
                <img width={'90%'} src={waze} alt="waze" />
            </button>
            </div>
        }
        else if(props.val.OrderStatus === 'Ready' && props.val.TakeAwayOrShipping === 'Take Away')
        {
            return <button onClick={DeliveredOrder}  style={{fontSize:'15px'}} className='PendingInPreparationButtons'>
            تم تسليم الطلبية
        </button>
        }

    }





  return (
    <div className='OrderComponentMainDiv'>
        <div style={{flexDirection:'column'}}>
        <h1 className='OrderNumberTitle' style={{marginRight:'0px',marginBottom:'3%'}}>رقم الطلبية</h1>
        <h2 className='OrderNumberNumber' style={{fontSize:'25px',marginLeft:'0px',marginBottom:'3%'}}>{props.val.OrderNumber}</h2>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
        {inPreparation()}
        {OrderStatusShow()}
        </div>
        </div>
        <button className='ShowDetailsButton' onClick={showDetails}>{ShowRelease}</button>
        <div className='DetailsMainDiv' style={{display:display}}>
        {DetailsOfCart()}
        </div>
        <div className='NamePhoneCityOrderComponentDiv'>
        <div>
        <h1>الاسم</h1>
        <h2>{props.val.name}</h2>
        </div>
        <div>
        <h1>رقم الهاتف</h1>
        <a href={PhoneNumberLink}>{props.val.phoneNumber}</a>
        </div>
        <div>
        <h1>البلد</h1>
        <h2>{props.val.City}</h2>
        </div>
        <div>
        <h1>طريقة التسليم</h1>
        <h2>{props.val.TakeAwayOrShipping}</h2>
        </div>
        <div>
        <h1>السعر النهائي + التوصيل</h1>
        <h2>{props.val.FinalPrice}</h2>
        </div>
        <div>
            <h1>ملاحظات</h1>
            <textarea disabled  name="textarea" cols="30" rows="4">
                {props.val.Notes}
            </textarea>
        </div>
        </div>
        

        {/* <h1>{props.val.Email}</h1> */}
        {/* <h1>{props.val.Notes}</h1> */}

    </div>
  )
}
