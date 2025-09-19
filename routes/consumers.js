const express = require('express');
const {
  getConsumers,
  getConsumerById,
  createConsumer,
  updateConsumer,
  deleteConsumer
} = require('../controllers/consumerController');

const { consumerValidationRules, validate } = require('../validators/consumerValidator');

const router = express.Router();

// GET all consumers
router.get('/', getConsumers);

// GET consumer by ID
router.get('/:id', getConsumerById);

// POST new consumer
router.post('/', consumerValidationRules(), validate, createConsumer);

// PUT update consumer
router.put('/:id', consumerValidationRules(), validate, updateConsumer);

// DELETE consumer
router.delete('/:id', deleteConsumer);

module.exports = router;
