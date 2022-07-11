//query resolvers
const Query = require('./queries/Query');
const Order = require('./queries/Order');
const User = require('./queries/User');

//mutation resolvers
const Mutation = require('./mutations/index')

module.exports = {
    Query,
    Order,
    User,
    Mutation
};