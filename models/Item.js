const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    section: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    unit: {
        type: String,
        required: true
    },
    maxQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    userQuantity: {
        type: Number,
        default: 0,
        min: 0
    },
    price: {
        type: Number,
        min: 0
    },
    laborOnly: Number,
    allInclusive: Number,
    isCustom: {
        type: Boolean,
        default: false
    },
    order: Number,
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

itemSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Item', itemSchema);