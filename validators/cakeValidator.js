const { body, validationResult } = require('express-validator');

const cakeValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('size').isIn(['small', 'medium', 'large']).withMessage('Size must be small, medium, or large'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('ingredients').optional().isArray().withMessage('Ingredients must be an array of strings')
  ];
};

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
