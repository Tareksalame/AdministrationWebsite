const express = require('express')
const app = express()
const bp = require('body-parser')
const db = require('mongoose')
const path = require('path');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;
app.use(express.static(path.join(__dirname, 'administration/build')))
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
db.connect(dbURI);
const nodemailer = require('nodemailer');


const OrderSchema = db.Schema({
    name:String,
    phoneNumber: String,
    City: String,
    Email:String,
    Notes:String,
    TakeAwayOrShipping:String,
    Location:Object,
    Cart:Object,
    FinalPrice:Number,
    OrderNumber:Number,
    OrderStatus:String
});
const InPreparationOrderSchema = db.Schema({
    name:String,
    phoneNumber: String,
    City: String,
    Email:String,
    Notes:String,
    TakeAwayOrShipping:String,
    Location:Object,
    Cart:Object,
    FinalPrice:Number,
    OrderNumber:Number,
    OrderStatus:String
});

const OrderModel = db.model('Order',OrderSchema);
const InPreparationOrderModel = db.model('InPreparationOrder',InPreparationOrderSchema);

app.get('/GetOrders', async(req,res)=>
{
    let temp = await OrderModel.find({OrderStatus:"Pending"});
    res.json(temp)
})
app.get('/GetInPreparationOrders', async(req,res)=>
{
    let temp = await OrderModel.find({OrderStatus:"In Preparation"});
    res.json(temp)
})

app.post('/BuyNow',async(req,res)=>
{
    let name = req.body.name;
    let phonenumber = req.body.phoneNumber;
    let city= req.body.city;
    let email = req.body.email;
    let notes = req.body.notes;
    let TakeAwayOrShipping = req.body.TakeAwayOrShipping;
    let location = req.body.location;
    let cart = req.body.cart;
    let FinalPrice = req.body.FinalPrice
    let OrderNumber = req.body.OrderNumber
    let OrderStatus = req.body.OrderStatus

    const temp = await OrderModel.insertMany({
        name:name,
        phoneNumber: phonenumber,
        City: city,
        Email:email,
        Notes:notes,
        TakeAwayOrShipping:TakeAwayOrShipping,
        Location:location,
        Cart:cart,
        FinalPrice:FinalPrice,
        OrderNumber:OrderNumber,
        OrderStatus:OrderStatus
    })
    if(temp !== null)
    {
        res.json('done')
    }
    else
    {
        res.json('error')
    }
})

app.post('/StartPrepare', async (req, res) => {
    let name = req.body.name;
    let phoneNumber = req.body.PhoneNumber;
    let city = req.body.City;
    let OrderNumber = req.body.OrderNumber;
    let OrderStatus = 'In Preparation';

        // Find the order based on multiple criteria and update the OrderStatus
        const updatedOrder = await OrderModel.findOneAndUpdate(
            {
                OrderNumber: OrderNumber
            },
            { $set: { OrderStatus: OrderStatus } },
        );

        if (updatedOrder) {
            // If the order is found and updated successfully
            res.json(updatedOrder);
        } else {
            // If the order with the specified criteria is not found
            res.status(404).json('Order not found');
        }
});




app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'administration/build', 'index.html'));
  });

  app.listen(process.env.PORT || 400, () => console.log('Server running on port', process.env.PORT || 400));
