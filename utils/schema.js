const Joi = require('joi');
module.exports = {
    allSchema : {
        id:Joi.object({
            id : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    permit: {
        permitBody : Joi.object({
            name : Joi.string().required()
        })
    },
    role:{
        permitAddToRole :  Joi.object({
            roleId :Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            permitId :Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    user:{
        userRegister : Joi.object({
            name :Joi.string().min(5).required(),
            email :Joi.string().email().required(),
            phone :Joi.string().min(7).max(11).required(),
            password :Joi.string().min(8).required()
        }),
        userLogin : Joi.object({
            phone :Joi.string().required(),
            password :Joi.string().required()
        }),
        roleAddToUser :  Joi.object({
            userId :Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            roleId :Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        permitAddToUser :  Joi.object({
            userId :Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            permitId :Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
   
}