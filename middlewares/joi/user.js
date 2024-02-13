let Joi = require('joi');
const resp = require("../../lib/response");
const constants = require("../../util/constants");
const logger = require("../../lib/logger");
// validation schema for create user
const createUserSchema = Joi.object({
  userName: Joi.string().required().messages({
    'any.required': 'Please enter a username.',
    'string.empty': 'Please enter a valid username.'
}),
age: Joi.number().required().messages({
    'any.required': 'Please enter an age.',
    'number.base': 'Age must be a number.'
}),
hobbies: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Please enter hobbies.',
    'array.base': 'Hobbies must be an array.',
    'array.includesRequiredUnknowns': 'Hobbies must contain only strings.'
})
});


// validation schema for update user
const updateUserJoiSchema = Joi.object({
  userName: Joi.string().optional().messages({
      'string.empty': 'Please enter a valid username.'
  }),
  age: Joi.number().optional().messages({
      'number.base': 'Age must be a number.'
  }),
  hobbies: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'Hobbies must be an array.',
      'array.includesRequiredUnknowns': 'Hobbies must contain only strings.'
  })
});



// Method to validate create user body
const createUser = function (req, res, next) {
  logger.info("Validating create user data");
  const validate = createUserSchema.validate(req.body);
  if (validate.error) {
    return resp.sendResponse(constants.response_code.BAD_REQUEST, validate.error.message, {}, res, validate.error);
  }
  return next();

};

// Method to validate update user req body
const updateUser = function (req, res, next) {
  logger.info("Validating update user req body");
  const validate = updateUserJoiSchema.validate(req.body);
  if (validate.error) {
    return resp.sendResponse(constants.response_code.BAD_REQUEST, validate.error.message, {}, res, validate.error);
  }
  return next();

};

// Method to validate with blank req body
const noBodyRequest = function (req, res, next) {
  logger.info("Validating no body request");
  const validate = noBodyRequestSchema.validate(req.body);
  if (validate.error) {
    return resp.sendResponse(constants.response_code.BAD_REQUEST, validate.error.message, {}, res, validate.error);
  }
  return next();

};

module.exports = {
  createUser,
  updateUser,
  noBodyRequest,
};
