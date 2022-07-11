const Boom = require('@hapi/boom');
module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    console.log("error validator: ", error);
    if (error) {
      return next(Boom.badRequest(error.details[0].message));
    }
    next();
  };
};
