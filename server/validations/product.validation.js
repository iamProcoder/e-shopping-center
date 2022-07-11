const Joi = require('joi');

const productValidation = (product) => {
    const productSchemaValidation = Joi.object({
        title: Joi.string().max(50).required(),
        description: Joi.string().max(250),
        price: Joi.number().required(),
        photos: Joi.array().items(Joi.string().required())
    });
    return productSchemaValidation.validate(product);
}

module.exports = productValidation;