const Cake = require('../models/cake');
const Joi = require('joi');

// Validation schema
const cakeSchema = Joi.object({
  name: Joi.string().required(),
  size: Joi.string().valid('small', 'medium', 'large').required(),
  price: Joi.number().positive().required(),
  ingredients: Joi.array().items(Joi.string())
});

// GET all
exports.getCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET by id
exports.getCakeById = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json(cake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
exports.createCake = async (req, res) => {
  const { error } = cakeSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newCake = new Cake(req.body);
    const savedCake = await newCake.save();
    res.status(201).json(savedCake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT
exports.updateCake = async (req, res) => {
  const { error } = cakeSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedCake = await Cake.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCake) return res.status(404).json({ message: 'Cake not found' });
    res.json(updatedCake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteCake = async (req, res) => {
  try {
    const deletedCake = await Cake.findByIdAndDelete(req.params.id);
    if (!deletedCake) return res.status(404).json({ message: 'Cake not found' });
    res.json({ message: 'Cake deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
