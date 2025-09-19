const Consumer = require('../models/consumer');

// GET all consumers
exports.getConsumers = async (req, res) => {
  try {
    const consumers = await Consumer.find().populate('favoriteCake');
    res.json(consumers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET consumer by ID
exports.getConsumerById = async (req, res) => {
  try {
    const consumer = await Consumer.findById(req.params.id).populate('favoriteCake');
    if (!consumer) return res.status(404).json({ message: 'Consumer not found' });
    res.json(consumer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new consumer
exports.createConsumer = async (req, res) => {
  try {
    const consumer = new Consumer(req.body);
    const savedConsumer = await consumer.save();
    res.status(201).json(savedConsumer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update consumer
exports.updateConsumer = async (req, res) => {
  try {
    const updated = await Consumer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Consumer not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE consumer
exports.deleteConsumer = async (req, res) => {
  try {
    const deleted = await Consumer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Consumer not found' });
    res.json({ message: 'Consumer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
