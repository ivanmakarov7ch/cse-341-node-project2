const mongoose = require('mongoose');

const consumerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  preferredFlavor: { type: String },
  allergies: { type: String },
  orderHistory: [{ type: String }] // could be IDs of orders later
});

module.exports = mongoose.model('Consumer', consumerSchema);
