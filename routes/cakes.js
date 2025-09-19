const express = require('express');
const { getCakes, createCake } = require('../controllers/cakeController');
const { cakeValidationRules, validate } = require('../validators/cakeValidator');

const router = express.Router();

router.get('/', getCakes);
router.post('/', cakeValidationRules(), validate, createCake);

module.exports = router;
