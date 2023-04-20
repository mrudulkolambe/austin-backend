const { body } = require("express-validator");

const passwordValidator = body('password').isLength({ min: 6 }).withMessage("Password should be atleast 6 characters long");


module.exports = passwordValidator;