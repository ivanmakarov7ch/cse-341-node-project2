const express = require('express');
const { getConsumers, createConsumer } = require('../controllers/consumerController');
const { consumerValidationRules, validate } = require('../validators/consumerValidator');

const router = express.Router();

router.get('/', getConsumers);
router.post('/', consumerValidationRules(), validate, createConsumer);

module.exports = router;

