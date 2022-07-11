const Boom = require('@hapi/boom');
const ObjectId = require('mongoose').Types.ObjectId; 
const Order = {
    user: async (parent, args, { User, isAuthorization }) => {
        if (!isAuthorization) return Boom.unauthorized();

        const user = await User.findById(parent.user);
        return user;
    },
    products: async (parent, args, { Product, isAuthorization}) => {
        if (!isAuthorization) return Boom.unauthorized();
        
        const parentProducts = [...parent.products];
        const products = await parentProducts.map(_product => {
            let p = ObjectId(_product.toString());
            return Product.findById(p);
        });
        return products;
    }
};

module.exports = Order;