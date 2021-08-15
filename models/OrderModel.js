const sequelize = require('../config/db')

const insertOrder = async (req, transaction)=>{
    const { member_id } = req.body
    return await sequelize.query(`
        INSERT INTO orders (member_id) VALUES (${member_id})
    `, { transaction })
    .then(([data])=>{
        return data
    })
}

const insertOrderDetail = async (req, transaction)=>{
    const { order_id, order_details } = req.body
    let command = order_details.map((item)=> {
        const { item_name, item_price, item_amount} = item
        return [`(${order_id}, '${item_name}', ${item_price}, ${item_amount})`]
    })
    command = `
    INSERT INTO order_details 
        (order_id, item_name, item_price, item_amount) 
    VALUES 
        ${command.join(',')}
    `
    return await sequelize.query(command, { transaction })
    .then(()=>{
        return true;
    })
    .catch((err)=>{
        console.log(err)
        return false
    })
}

const getOrderList = async (req)=>{
    return await sequelize.query(`
        SELECT
            o.order_id,
            o.member_id,
            d.item_name,
            d.item_price,
            d.item_amount,
            o.created
        FROM orders o
        LEFT JOIN order_details d ON d.order_id = o.order_id
        ORDER BY o.order_id DESC
    `)
    .then(([data])=>{
        return data
    })
}

module.exports = {
    insertOrder,
    insertOrderDetail,
    getOrderList
}



