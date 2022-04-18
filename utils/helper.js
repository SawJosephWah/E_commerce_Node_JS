let bcrypt = require('bcryptjs');
let Redis = require("async-redis").createClient();
let jwt = require('jsonwebtoken');

module.exports = {
    fMsg : (res,msg="",result={})=>{
        res.status(200).send({con:true,msg,result})
    },
    encode: payload => bcrypt.hashSync(payload),
    decode: (payload,hash) => bcrypt.compareSync(payload, hash),
    setRedis : async (key,value) => await Redis.set(key.toString(),JSON.stringify(value)), 
    getRedis : async (key) => await Redis.get(key.toString()),
    dropRedis :async (key) => await Redis.del(key.toString()),
    generateToken : (value) => jwt.sign(value, process.env.SECRET_KEY),
    decodeToken : (token) => jwt.verify(token, process.env.SECRET_KEY)
}