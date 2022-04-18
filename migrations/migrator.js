const fs = require('fs');
const UserDB = require('../models/user');
const RoleDB = require('../models/role');
const PermitDB = require('../models/permit');
const Helper = require('../utils/helper');

//user migrate
let migrate = ()=>{
    const data = fs.readFileSync('./migrations/users.json');
    const users = JSON.parse(data);
    users.forEach(async el => {
        el.password = Helper.encode(el.password);
        await UserDB(el).save();
    })
    console.log("User migration");
}

//role and permit migrate
let migrate_role_permit = ()=>{
    const data = fs.readFileSync('./migrations/role_permit.json');
    const role_permit = JSON.parse(data);

    //role migrate
    role_permit.roles.forEach(async el => {
        await RoleDB(el).save();
    })

     //permit migrate
    role_permit.permits.forEach(async el => {
        await PermitDB(el).save();
    })
    console.log("Role and permit migration successfully !");
}

//add owner role to owner use
let add_owner_role_to_owner_user = async ()=>{
    let OwnerRole = await RoleDB.findOne({name:"Owner"});
    let OwnerUser = await UserDB.findOne({phone:"09100100100"});
    await UserDB.findByIdAndUpdate(OwnerUser._id, { $push: { roles: OwnerRole._id }});
    console.log('Add onwer role to owner user successfully');
}

//back up
let backup = async ()=>{
    let users = await UserDB.find();
    fs.writeFileSync('./migrations/backups/users.js',JSON.stringify(users));
    console.log('User backuped successfully');
}

module.exports = {
    migrate,
    backup,
    migrate_role_permit,
    add_owner_role_to_owner_user
}