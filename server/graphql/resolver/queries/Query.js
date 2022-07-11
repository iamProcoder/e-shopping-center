const Boom = require('@hapi/boom');
const redis = require("../../../redis/redisConfig");

const Query = {
    userInfo: async (parent, args, { User, isAuthorization }) => {
        if (!isAuthorization) return Boom.unauthorized();       
        const user = await User.findById(args.id);
        return user; 
    },

    getProductList: async (parent, args, { Product, isAuthorization }) => {
        if (!isAuthorization) return Boom.unauthorized();
        
        let redis_products = await redis.get('products-list');
        if (!redis_products) {     
            const products = await Product.find({});
            await redis.set('products-list', JSON.stringify(products));
            redis_products = products;
        }
        else redis_products = JSON.parse(redis_products);

        return redis_products;
    },

    getProduct: async (parent, args, { Product, isAuthorization }) => {
        if (!isAuthorization) return Boom.unauthorized();

        let product;
        const redis_products_list = await redis.get('products-list');
        if (!redis_products_list) product = await Product.findById(args.id);
        else { 
            const productList = await JSON.parse(redis_products_list);
            product = productList.find(f => f.id === args.id);
        }

        return product;
    },

    getOrdersList: async (parent, args, { Order, isAuthorization }) => {
        if (!isAuthorization) return Boom.unauthorized();
        const orders = await Order.find({});
        return orders;
    },

    getOrderListByUser: async (parent, args, { User, isAuthorization }) => {
        if (!isAuthorization) return Boom.unauthorized();
       
        const myOrders = await User.findById(args.id).sort({'createdAt': 'desc'});
        return myOrders;
    }
};

module.exports = Query;