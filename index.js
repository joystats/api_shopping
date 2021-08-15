const express = require('express')
const app = express();
const config = require('config')
const PORT = config.get('port')
const authenRoute = require('./route/Authen')
const memberRoute = require('./route/Member')
const orderRoute = require('./route/Order')
const cors = require('cors')

const socketIO = require('socket.io')

app.use(cors())
app.use(express.json())

app.use('/authen', authenRoute)
app.use('/member', memberRoute)
app.use('/order', orderRoute)

app.get('/', (req, res)=>{
    res.json({
        success: true
    })
})

const server = app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

const io = socketIO(server, {
    cors: {
        origin: '*',
    }
})
io.on("connection",(socket)=>{
    console.log(`${socket.id} is connecting`)

    socket.on("disconnect",()=>{
        console.log(socket.id+" is disconnected")
    })

    socket.on("insertOrder",(data)=>{
        io.emit("sendOrder", data)
    })

})

