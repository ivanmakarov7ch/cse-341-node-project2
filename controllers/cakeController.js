const Cake = require('../models/cake');

// GET all cakes
exports.getCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET cake by ID
exports.getCakeById = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json(cake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new cake
exports.createCake = async (req, res) => {
  try {
    const cake = new Cake(req.body);
    const savedCake = await cake.save();
    res.status(201).json(savedCake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update cake
exports.updateCake = async (req, res) => {
  try {
    const updatedCake = await Cake.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCake) return res.status(404).json({ message: 'Cake not found' });
    res.json(updatedCake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE cake
exports.deleteCake = async (req, res) => {
  try {
    const deletedCake = await Cake.findByIdAndDelete(req.params.id);
    if (!deletedCake) return res.status(404).json({ message: 'Cake not found' });
    res.json({ message: 'Cake deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
