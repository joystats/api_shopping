const memberRoute = require('express').Router();
const sequelize = require('../config/db')
const md5 = require('md5')
const MemberModel = require('../models/MemberModel')
const { validToken } = require('../controllers/TokenController')

memberRoute.get('/', (req, res)=>{
    res.json({
        success: true
    })
})

memberRoute.post('/register', (req, res)=>{
    const { member_name, member_username, member_password} = req.body
    sequelize.query(`
        INSERT INTO members 
            (member_name, member_username, member_password) 
        VALUES
            ('${member_name}','${member_username}','${md5(member_password)}')
    `)
    .then(([data])=>{
        res.json({
            success: true,
            member_id: data
        })
    })
    .catch((err)=>{
        res.json({
            success: false,
            message: err
        })
    })
})

memberRoute.get('/:member_id', validToken, async (req, res)=>{
    const data = await MemberModel.getMemerInfo(req)
    res.json(data)
})

module.exports = memberRoute

