const Boom = require('@hapi/boom');
const validator = require('../../../middleware/validator');
const validationOrder = require('../../../validations/order.validation');

module.exports = {
    addOrder: async (parent, args, { Order, isAuthorization, activeUser }) => {
        if (!isAuthorization) return Boom.unauthorized();
        const input = args.data;
        validator(validationOrder);
        try {
            const { user } = activeUser;
            const order = new Order(input);
            order.user = user._id;
            order.products = JSON.parse(JSON.stringify(input.productIds));
           
            const savedOrder = await order.save();
            const _savedOrder = savedOrder.toObject();
            delete _savedOrder._v;
            return _savedOrder;

        } catch (e) {
            console.log(e);
            return e;
        }
    }
}