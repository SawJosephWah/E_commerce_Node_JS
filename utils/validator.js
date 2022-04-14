
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
    }
}