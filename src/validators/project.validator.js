const { body } = require('express-validator');

exports.createProjectValidator = [
  body('title')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('description')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  body('location')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Location must be at least 3 characters long'),
  body('status')
    .optional()
    .isIn(['ongoing', 'completed'])
    .withMessage('Status must be either ongoing or completed'),
];

exports.updateProjectValidator = [
  body('title')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('description')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  body('location')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Location must be at least 3 characters long'),
  body('status')
    .optional()
    .isIn(['ongoing', 'completed'])
    .withMessage('Status must be either ongoing or completed'),
];
