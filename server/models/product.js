const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    photos: [
        {
            type: String,
            required: true
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
});

module.exports = mongoose.model('product', ProductSchema);