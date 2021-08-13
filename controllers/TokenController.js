const jwt = require('jsonwebtoken')

const validToken = (req, res, next)=>{
    try {
        const header = req.headers['authorization'];
        if(typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            jwt.verify(token, 'kline', function(err, decoded) {
                if(err) throw 'invalid token';
                console.log(decoded)
                const { member_id } = decoded.data
                req.body.member_id = member_id
                if(member_id){
                    next()
                }else{
                    throw 'member_id is wrong'
                }
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
}

module.exports = {
    validToken
}

