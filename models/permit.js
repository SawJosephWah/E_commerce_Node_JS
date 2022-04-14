let mongoose = require('mongoose');
const { Schema } = mongoose;

const permitSchema = new Schema({
  name:  {type:String,unique: true }, // String is shorthand for {type: String}
});

const Permit = mongoose.model('Permit', permitSchema);

module.exports = Permit;
