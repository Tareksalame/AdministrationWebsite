import {createContext, useState,useEffect} from 'react'
import خبز from './images/menu/5obz.jpg'
import مكس from './images/menu/mix.jpg'
import مقطع from './images/menu/mkt3.jpg'
import رول from './images/menu/roll.jpg'
import water from './images/menu/water.jpg'
import zero from './images/menu/zero.png'
import cola from './images/menu/cola.jpeg'
import fanta from './images/menu/fanta.jpeg'
import check from './images/menu/checked.png'
import x from './images/menu/No.png'


const userContext = createContext();

export const UsersProvider = ({children})=>
{
    const [orders, setOrders] = useState([]);
    const[inPreparationOrders,setInPreparationOrders] = useState([])
    const[ReadyOrders,setReadyOrders] = useState([])
    const[ReadyOrdersShipping,setReadyOrdersShipping] = useState([])

    const [counter,setCounter] = useState(null)
    const [InPreparationCounter,setInPreparationCounter] = useState(null)
    const [ReadyCounter,setReadyCounter] = useState(null)
    const [ShippingCounter,setShippingCounter] = useState(null)







    const [mealIndex,setMealIndex] = useState(null)
    const [drinkIndex,setDrinkIndex] = useState(null)
    const [cart,setCart] = useState([])
    const cartArr = []
    const [FinalCart,setFinalCart] = useState([])
    const [FinalPrice,SetFinalPrice]= useState(0)
    const [OrderNumber,setOrderNumber] = useState(0)
    const [name,setName] = useState('')
    const [PhoneNumber,setPhoneNumber] = useState('')
    const [City,setCity] = useState('')
    const [Email,setEmail] = useState('')
    const [Notes,setNotes] = useState('')




    const mealsMenu = [
        {meal : 'رول عرايس' , price: 15 , img:رول},
        {meal : '2رول عرايس' , price: 25    , img:رول},
        {meal : 'خبزة عرايس' , price: 15    , img:خبز},
        {meal : 'مكس عرايس' , price: 35     , img:مكس},
        {meal : 'بوكس خبز مقطع' , price: 20 , img:مقطع},
    ]
    const drinkMenu = [
        {meal : "فانتا" , price: 3     , img:fanta},
        {meal : "ماء" , price: 3       , img:water},
        {meal : "كولا زيرو" , price: 3 , img:zero },
        {meal : "كوكا كولا" , price: 3 , img:cola },
    ]
    const additionsMenu = [
        {add : '🥒خيار مخلل '    ,YesNo: x},
        {add : '🧅بصل مع بقدونس' ,YesNo: x},
        {add : '🍅بندورة'        ,YesNo: x},
        {add : '🍈ملفوف'         ,YesNo: x},
        {add : '🌶️فليفلة'        ,YesNo: x}
    ]

  const [location, setLocation] = useState(null);
  const [openClose ,setOpenClose] = useState(false);
  const[open,setOpen] = useState('none')
  const[close,setClose] = useState('flex')
  const[takeAwayOrShipping,setTakeAwayOrShipping] = useState('Take Away')
  const[distance,setDistance] = useState(null)




  const [restaurantLocation, setRestaurantLocation] = useState({
    latitude: 32.4108052, // Replace with the actual latitude of the restaurant
    longitude: 35.0371928, // Replace with the actual longitude of the restaurant
  });


const calculateDistance = () => {
    if (location && restaurantLocation) {
      const R = 6371; // Radius of the Earth in kilometers
      const lat1 = location.latitude;
      const lon1 = location.longitude;
      const lat2 = restaurantLocation.latitude;
      const lon2 = restaurantLocation.longitude;

      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      setDistance(R * c); // Distance in kilometers

    }
  };

  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };




    return (
    <userContext.Provider value={{ShippingCounter,setShippingCounter,
      ReadyCounter,setReadyCounter,InPreparationCounter,setInPreparationCounter,counter,setCounter,ReadyOrdersShipping,setReadyOrdersShipping,ReadyOrders,setReadyOrders,
      inPreparationOrders,setInPreparationOrders,orders, setOrders,OrderNumber,setOrderNumber,
        FinalPrice,SetFinalPrice,calculateDistance,FinalCart,setFinalCart,
    name,setName,PhoneNumber,setPhoneNumber,City,setCity,Email,setEmail,Notes,setNotes,
    additionsMenu,cartArr,cart,setCart,drinkIndex,setDrinkIndex,mealIndex,setMealIndex,mealsMenu,drinkMenu,distance,
    setDistance,takeAwayOrShipping,setTakeAwayOrShipping,
    close,setClose,open,setOpen,openClose ,
    setOpenClose,location, setLocation}}>
        {children}
    </userContext.Provider>
    )
}

export default userContext