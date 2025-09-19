const Consumer = require('../models/consumer');
const Joi = require('joi');

// Validation schema
const consumerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  address: Joi.string(),
  preferredFlavor: Joi.string(),
  allergies: Joi.string(),
  orderHistory: Joi.array().items(Joi.string())
});

// GET all
exports.getConsumers = async (req, res) => {
  try {
    const consumers = await Consumer.find();
    res.json(consumers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET by id
exports.getConsumerById = async (req, res) => {
  try {
    const consumer = await Consumer.findById(req.params.id);
    if (!consumer) return res.status(404).json({ message: 'Consumer not found' });
    res.json(consumer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
exports.createConsumer = async (req, res) => {
  const { error } = consumerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newConsumer = new Consumer(req.body);
    const savedConsumer = await newConsumer.save();
    res.status(201).json(savedConsumer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT
exports.updateConsumer = async (req, res) => {
  const { error } = consumerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedConsumer = await Consumer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedConsumer) return res.status(404).json({ message: 'Consumer not found' });
    res.json(updatedConsumer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteConsumer = async (req, res) => {
  try {
    const deletedConsumer = await Consumer.findByIdAndDelete(req.params.id);
    if (!deletedConsumer) return res.status(404).json({ message: 'Consumer not found' });
    res.json({ message: 'Consumer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
