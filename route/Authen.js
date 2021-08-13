const authenRoute = require('express').Router();
const sequelize = require('../config/db')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

authenRoute.get('/', (req, res)=>{
    res.json({
        success: true
    })
})

authenRoute.post('/login', (req, res)=>{
    const { member_username, member_password } = req.body
    sequelize.query(`
        SELECT 
            member_id, member_name 
        FROM members 
        WHERE member_username='${member_username}' AND member_password='${md5(member_password)}'
    `)
    .then(([data])=>{
        const { member_id, member_name } = data[0]
        const token = jwt.sign(
            {data: { member_id, member_name }}
            ,'kline', 
            {expiresIn: 60*60*3}
        )
        res.json({
            success: true,
            data: token
        })
    })
    .catch((err)=>{
        res.json({
            success: false,
            message: err
        })
    })
})

authenRoute.post('/verify', (req, res)=>{
    try {
        const header = req.headers['authorization'];
        if(typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            jwt.verify(token, 'kline', function(err, decoded) {
                if(err) throw 'invalid token';
                res.json({
                    success: false,
                    ...decoded
                })
            });
        } else {
            throw "Authorization code error";
        }
    }catch(err) {
        res.json({
            success: false,
            err: err
        })
    }
})

module.exports = authenRoute

