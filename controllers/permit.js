const DB = require('../models/permit')
const Helper = require('../utils/helper')

const add =async  (req,res,next) => {
    let permitExists = await DB.findOne({name:req.body.name});
    // Helper.fMsg(res,'check',permitExists);
    if(permitExists){
        next(new Error('Permit name already exist'));
    }else{
        let result = await new DB(req.body).save();
        Helper.fMsg(res,'Permit added',result);
    }
   
    // throw new Error();
}

const all = async (req,res,next) => {
    let permits = await DB.find();
    Helper.fMsg(res,'All permits',permits);
}

const get = async (req,res,next) => {
    let permit = await DB.findById(req.params.id);
    if(permit){
        Helper.fMsg(res,'Get permit with Id',permit);
    }else{
        next(new Error('No permission with that Id'));
    }
    
}

const drop = async (req,res,next) => {
    let permit = await DB.findById(req.params.id);
    if(permit){
        await DB.findByIdAndDelete(req.params.id);
        Helper.fMsg(res,'Permission Deleted',{});
    }else{
        next(new Error('No permission with that Id'));
    }
}

const update = async (req,res,next) => {
    let permit = await DB.findById(req.params.id);
    if(permit){
        await DB.findByIdAndUpdate(permit._id,req.body);
        let updated = await DB.findById(req.params.id);
        Helper.fMsg(res,'Permission updated',updated);
    }else{
        next(new Error('No permission with that Id'));
    }
    
}

module.exports = {
    add,
    all,
    get,
    drop,
    update
}