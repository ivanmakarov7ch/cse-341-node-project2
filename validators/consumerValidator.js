const { body, validationResult } = require('express-validator');

// Rules for creating/updating consumers
const consumerValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').optional().isMobilePhone().withMessage('Phone must be valid'),
    body('address').optional().isString().withMessage('Address must be a string'),
    body('preferredFlavor').optional().isString().withMessage('Preferred flavor must be a string'),
    body('allergies').optional().isString().withMessage('Allergies must be a string'),
    body('orderHistory').optional().isArray().withMessage('Order history must be an array')
  ];
};

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
  consumerValidationRules,
  validate
};
