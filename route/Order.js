const orderRoute = require('express').Router();
const sequelize = require('../config/db')
const OrderModel = require('../models/OrderModel')
const { validToken } = require('../controllers/TokenController')

orderRoute.post('/', validToken, async (req, res)=>{
    let transaction = await sequelize.transaction()
    OrderModel.insertOrder(req, transaction)
    .then((data)=>{
        req.body.order_id = data
        Promise.all([
            OrderModel.insertOrderDetail(req, transaction)
        ]).then((data)=>{
            const notCompleted = data.some((item)=>{
                return item === false
            })
            if(notCompleted){
                throw 'some table is not complete'
            }else{
                transaction.commit()
                res.json({
                    success: true,
                    message: 'Insert all table is successfull'
                })
            }
        }).catch((err)=>{
            transaction.rollback()
            res.json({
                success: false,
                message: err
            })
        })
        
    }).catch((err)=>{
        transaction.rollback()
        res.json({
            success: false,
            message: err
        })
    })
})

orderRoute.get('/list', validToken, async (req, res)=>{
    OrderModel.getOrderList()
    .then((data)=>{
        res.json({
            success: true,
            orders: data
        })
    })
    .catch((err)=>{
        res.json({
            success: false,
            message: err
        })
    })
})


module.exports = orderRoute

