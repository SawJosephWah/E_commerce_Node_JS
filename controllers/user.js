let UserDB = require('../models/user');
let RoleDB = require('../models/role');
let PermitDB = require('../models/permit');
let Helper = require('../utils/helper');

let register = async (req,res,next) => {
    let emailExists = await UserDB.findOne({email:req.body.email});
    if(emailExists){
        next(new Error('Email already exists'));
        return;
    }


    let phoneExists = await UserDB.findOne({phone:req.body.phone});
    if(phoneExists){
        next(new Error('Phone already exists')); 
        return;
    }


    req.body.password = Helper.encode(req.body.password);
    await UserDB(req.body).save();
    Helper.fMsg(res,'User registerd succesfully ');

}

let login = async (req,res,next) => {
    let phoneExists = await UserDB.findOne({phone:req.body.phone}).populate('roles permits');
    if(phoneExists){
        let passwordCheck = Helper.decode(req.body.password,phoneExists.password);
        if(passwordCheck){
            let user = phoneExists.toObject();
            delete user.password;
            user.token = Helper.generateToken(user);
            Helper.setRedis(user._id,user);
            Helper.fMsg(res,'Successfully login',user);
        }else{
            next(new Error('Credential error')); 
        }
        // Helper.fMsg(res,'Successfully login',phoneExists);
    }else{
        next(new Error('Credential error'));
    }
}

let add_role_to_user = async (req,res,next)=>{
    let user = await UserDB.findById(req.body.userId);
    let role = await RoleDB.findById(req.body.roleId);
    if(user && role){
        if(user.roles.find(el => el.toString() == role._id.toString())){
            next(new Error("Role already exist for this user"))
        }else{
            await UserDB.findByIdAndUpdate(user._id,{ $push: { roles: role._id }});
            Helper.fMsg(res,"Added role to user");
        }
    }else{
        next(new Error("Invalid request "))
    }
}

let remove_role_from_user = async (req,res,next)=>{
    let user = await UserDB.findById(req.body.userId);
    let role = await RoleDB.findById(req.body.roleId);
    if(user && role){
        if(user.roles.find(el => el.toString() == role._id.toString())){
            await UserDB.findByIdAndUpdate(user._id,{ $pull: { 'roles': role._id}});
            // next(new Error("Role already exist for this user"))
             Helper.fMsg(res,"Removed role from user");
        }else{
            // await UserDB.findByIdAndUpdate(user._id,{ $push: { roles: role._id }});
            // Helper.fMsg(res,"Added role to user");
            
            next(new Error("Role do not found for this user"));
        }
    }else{
        next(new Error("Invalid request"))
    }
}

let add_permit_to_user = async (req,res,next)=>{
    let user = await UserDB.findById(req.body.userId);
    let permit = await PermitDB.findById(req.body.permitId);
    if(user && permit){
        if(user.permits.find(el => el.toString() == permit._id.toString())){
            next(new Error("Permit already exist for this user"))
        }else{
            await UserDB.findByIdAndUpdate(user._id,{ $push: { permits: permit._id }});
            let result = await UserDB.findById(user._id);
            Helper.fMsg(res,"Added permit to user",result);
        }
    }else{
        next(new Error("Invalid request"))
    }
}

let remove_permit_from_user = async (req,res,next)=>{
    let user = await UserDB.findById(req.body.userId);
    let permit = await PermitDB.findById(req.body.permitId);
    if(user && permit){
        if(user.permits.find(el => el.toString() == permit._id.toString())){
            await UserDB.findByIdAndUpdate(user._id,{ $pull: { 'permits': permit._id}});
            Helper.fMsg(res,"Removed permit from user");
        }else{   
            next(new Error("Permit do not found for this user"));
        }
    }else{
        next(new Error("Invalid request"))
    }
}

module.exports = {
    register,
    login,
    add_role_to_user,
    remove_role_from_user,
    add_permit_to_user,
    remove_permit_from_user
}