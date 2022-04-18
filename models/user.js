let mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name:  {type:String,unique: true },
  email:  {type:String,required:true,unique: true },
  phone:  {type:String,required:true,unique: true },
  password:  {type:String,unique: true },
  roles: [{type:Schema.Types.ObjectId,'ref':'Role' }],
  permits:   [{type:Schema.Types.ObjectId,'ref':'Permit' }],
  created:  {type:Date,default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

