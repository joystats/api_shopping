const express = require('express')
const app = express();
const config = require('config')
const PORT = config.get('port')
const authenRoute = require('./route/Authen')
const memberRoute = require('./route/Member')
const orderRoute = require('./route/Order')

app.use(express.json())

app.use('/authen', authenRoute)
app.use('/member', memberRoute)
app.use('/order', orderRoute)

app.get('/', (req, res)=>{
    res.json({
        success: true
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})
