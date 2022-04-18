let Helper = require('./helper');
module.exports = {
    validatePermitBody : (schema)=>{
        return (req,res,next) => {
            let validate = schema.validate(req.body);
            if(validate.error){
                next(new Error(validate.error));
            }else{
                next();
            }
        }
    },
    validateObjectId : (schema)=>{
        return (req,res,next) => {
            let validate = schema.validate({id:req.params.id});
            if(validate.error){
                next(new Error(validate.error));
            }else{
                next();
            }
        }
    },
    valiatePermitAddToRole : (schema)=>{
        return (req,res,next) => {
            let validate = schema.validate(req.body);
            if(validate.error){
                next(new Error(validate.error));
            }else{
                next();
            }
        }
    },
    validateUserRegister:(schema)=>{
        return (req,res,next) => {
            let validate = schema.validate(req.body);
            if(validate.error){
                next(new Error(validate.error));
            }else{
                next();
            }
        }
    },
    validateUserLogin:(schema)=>{
        return (req,res,next) => {
            let validate = schema.validate(req.body);
            if(validate.error){
                next(new Error(validate.error));
            }else{
                next();
            }
        }
    },
    validateToken : async (req,res,next)=>{
        // console.log(req.headers.authorization);
        if(req.headers.authorization){
            let user_id = Helper.decodeToken(req.headers.authorization.split(' ')[1])._id;
            if(user_id){
               let user =  await Helper.getRedis(user_id);
               if(user){
                req.user = JSON.parse(user);
               next();
               }else{
                next(new Error('Tokenization Error'));
               }
            }else{
                next(new Error('Tokenization Error'));
            }
        }else{
            next(new Error('Tokenization Error'))
        }
    },
    validateRoleAddToUser : (schema)=>{
        return (req,res,next) => {
            let validate = schema.validate(req.body);
            if(validate.error){
                next(new Error(validate.error));
            }else{
                next();
            }
        }
    },
    validatePermitAddToUser : (schema)=>{
        return (req,res,next) => {
            let validate = schema.validate(req.body);
            if(validate.error){
                next(new Error(validate.error));
            }else{
                next();
            }
        }
    },
    validateRole : (role)=>{
        return (req,res,next) => {
            let user = req.user;
            if(user.roles.find(el => el.name == role)){
                next();
            }else{
                next(new Error('Permission denied'));
            }    
        }
    }
}