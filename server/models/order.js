const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    address: [
        {
            type: String,
            required: true
        }
    ],
    billingAddress: [
        {
            type: String,
            required: true,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }, 
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

OrderSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
});

module.exports = mongoose.model('order', OrderSchema);