const Boom = require('@hapi/boom');
const User = {
    orders: async (parent, args, { Order, isAuthorization }) => {
        if (!isAuthorization) return Boom.unauthorized();

        const myOrders = await Order.find({user: parent._id}).sort({'createdAt': 'desc'});
        return myOrders;
    
    }
}

module.exports = User;