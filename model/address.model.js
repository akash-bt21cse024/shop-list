const mongoose = require('mongoose');
const { Schema } = mongoose;
const addressSchema = new Schema({
  name: { type: String, required: true },
  lastname: String,
  email: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
})

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;