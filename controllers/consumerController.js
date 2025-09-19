const Consumer = require('../models/consumer');

// GET all
exports.getConsumers = async (req, res) => {
  try {
    const consumers = await Consumer.find();
    res.json(consumers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET by ID
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
  try {
    const updated = await Consumer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Consumer not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteConsumer = async (req, res) => {
  try {
    const deleted = await Consumer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Consumer not found' });
    res.json({ message: 'Consumer deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
