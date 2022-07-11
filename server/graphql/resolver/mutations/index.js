const user = require('./user.mutation');
const product = require('./product.mutation');
const order = require('./order.mutation');

const Mutation = {
    ...user,
    ...product,
    ...order
};

module.exports = Mutation;