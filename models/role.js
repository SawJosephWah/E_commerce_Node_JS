let mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
  name:  {type:String,unique: true }, 
  permits : [{type:Schema.Types.ObjectId,'ref':'Permit' }]
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
