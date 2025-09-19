const { body, validationResult } = require('express-validator');

// Rules for creating/updating cakes
const cakeValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('flavor').notEmpty().withMessage('Flavor is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('available').optional().isBoolean().withMessage('Available must be true/false')
  ];
};

// Middleware to check results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  cakeValidationRules,
  validate
};
