const mongoose = require('mongoose');
const { Schema } = mongoose;
const addressSchema = new Schema({
  id: { type: String, required: true, unique: true },
  address: Array,
})

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;