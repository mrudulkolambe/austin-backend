const { body } = require("express-validator");

const emailValidator = body('email').isEmail().withMessage("Invalid Email");

module.exports = emailValidator;