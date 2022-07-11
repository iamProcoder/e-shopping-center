const Joi = require('joi');

const orderValidation = (order) => {
    const orderSchemaValidation = Joi.object({
        address: Joi.array().items(Joi.string().max(500)).required(),
        billingAddress: Joi.array().items(Joi.string().max(500)).required(),
        products: Joi.array().items(Joi.string()).required()
    });
    return orderSchemaValidation.validate(order);
}

module.exports = orderValidation;