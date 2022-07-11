const Joi = require('joi');

const userValidation = (user) => {
    const userSchemaValidation = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(20).required(),
        name: Joi.string().min(3).max(50).required(),
        surname: Joi.string().min(3).max(50).required(),
        birthday: Joi.date()
    });
    return userSchemaValidation.validate(user);
}

module.exports = userValidation;