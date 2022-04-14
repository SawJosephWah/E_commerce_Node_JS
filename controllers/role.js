const RoleDB = require('../models/role');
const PermitDB = require('../models/permit');
const Helper = require('../utils/helper')

const add =async  (req,res,next) => {
    let roleExists = await RoleDB.findOne({name:req.body.name});
    
    if(roleExists){
        next(new Error('Role name already exist'));
    }else{
        let result = await new RoleDB(req.body).save();
        Helper.fMsg(res,'Role added',result);
    }

}

const all = async (req,res,next) => {
    let roles = await RoleDB.find();
    Helper.fMsg(res,'All roles',roles);
}

const get = async (req,res,next) => {
    let role = await RoleDB.findById(req.params.id);
    if(role){
        Helper.fMsg(res,'Get role with Id',role);
    }else{
        next(new Error('No role with that Id'));
    }
    
}

const drop = async (req,res,next) => {
    let role = await RoleDB.findById(req.params.id);
    if(role){
        await RoleDB.findByIdAndDelete(req.params.id);
        Helper.fMsg(res,'Role Deleted',{});
    }else{
        next(new Error('No role with that Id'));
    }
}

const update = async (req,res,next) => {
    let role = await RoleDB.findById(req.params.id);
    if(role){
        await RoleDB.findByIdAndUpdate(role._id,req.body);
        let updated = await RoleDB.findById(role._id);
        Helper.fMsg(res,'Role updated',updated);
    }else{
        next(new Error('No role with that Id'));
    }
    
}

const addPermitToRole = async (req,res,next) => {
    let role = await RoleDB.findById(req.body.roleId);
    let permit = await PermitDB.findById(req.body.permitId);
    // Helper.fMsg(res,'Add permit to role updated',role);
    if(role && permit){
        await RoleDB.findByIdAndUpdate(role._id, { $push: { permits: permit._id } });
        let result = await RoleDB.findById(role._id);
        Helper.fMsg(res,'Add permit to role updated',result);
    }else{
        next(new Error('Role ID and permit Id must be valid !')); 
    }
}

module.exports = {
    add,
    all,
    get,
    drop,
    update,
    addPermitToRole
}