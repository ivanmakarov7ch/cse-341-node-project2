const { body, validationResult } = require('express-validator');

// Rules for creating/updating consumers
const consumerValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').optional().isMobilePhone().withMessage('Phone must be valid'),
    body('favoriteCake').optional().isMongoId().withMessage('Favorite cake must be a valid ID')
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
  consumerValidationRules,
  validate
};
