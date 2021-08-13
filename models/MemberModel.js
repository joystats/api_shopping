const sequelize = require('../config/db')

const getMemerInfo = (req)=>{
    const { member_id } = req.params
    return sequelize.query(`SELECT member_id, member_name FROM members WHERE member_id=${member_id}`)
    .then(([data])=>{
        return data
    })
    .catch((err)=>{
        return {
            success: false,
            message: err
        }
    })
}

module.exports = {
    getMemerInfo
}

