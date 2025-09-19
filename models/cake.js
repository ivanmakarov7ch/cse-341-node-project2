const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, enum: ['small', 'medium', 'large'], required: true },
  price: { type: Number, required: true },
  ingredients: [{ type: String }]
});

module.exports = mongoose.model('Cake', cakeSchema);
