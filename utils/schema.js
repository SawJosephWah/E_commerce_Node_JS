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
    }
   
}