const express = require('express');
const {
  getCakes,
  getCakeById,
  createCake,
  updateCake,
  deleteCake
} = require('../controllers/cakeController');

const { cakeValidationRules, validate } = require('../validators/cakeValidator');

const router = express.Router();

// GET all cakes
router.get('/', getCakes);

// GET cake by ID
router.get('/:id', getCakeById);

// POST new cake
router.post('/', cakeValidationRules(), validate, createCake);

// PUT update cake
router.put('/:id', cakeValidationRules(), validate, updateCake);

// DELETE cake
router.delete('/:id', deleteCake);

module.exports = router;
