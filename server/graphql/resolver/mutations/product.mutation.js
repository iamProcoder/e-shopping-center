const Boom = require('@hapi/boom');
const redis = require("../../../redis/redisConfig");
const validator = require('../../../middleware/validator');
const validationProduct = require('../../../validations/product.validation');

module.exports = {
    addProduct: async (parent, args, { Product, isAuthorization }) => {
        if (!isAuthorization) return Boom.unauthorized();  
        const input = args.data; 
        validator(validationProduct);
        try {
            
            input.photos = JSON.parse(JSON.stringify(input.photos));
            const product = new Product(input);
            const savedData = await product.save();
            
            const _savedData = savedData.toObject();
            delete _savedData._v;
            await redis.del('products-list');
            return _savedData;

        } catch (e) {            
            console.log(e);
            return e;
        }
    },

    updateProduct: async (parent, args, { Product, isAuthorization }) => {
        if (!isAuthorization) return Boom.unauthorized();  
        const input = args.data; 
        const { id } = args.params;
        validator(validationProduct); 
        try {

            input.photos = JSON.parse(JSON.stringify(input.photos));
            const updateData = await Product.findByIdAndUpdate(id, input, { new: true });
            const _updateData = updateData.toObject();
            delete _updateData._v;
            await redis.del('products-list');
            return _updateData;

        } catch (e) {            
            console.log(e);
            return e;
        }
    },

    deleteProduct: async (parent, args, { Product, isAuthorization}) => {
        if (!isAuthorization) return Boom.unauthorized();  
        const id = args.id; 
        validator(validationProduct);
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);

            if (!deletedProduct) throw Boom.badRequest("Product not found.");

            const _deletedProduct = deletedProduct.toObject();
            delete _deletedProduct._v;
            await redis.del('products-list');
            return _deletedProduct;
		
        } catch (e) {            
            console.log(e);
            return e;
        }
    }

}