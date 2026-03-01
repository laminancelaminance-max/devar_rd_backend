const mongoose = require('mongoose');

const userProjectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  projectName: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  items: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    customName: String,
    customDescription: String,
    userQuantity: {
      type: Number,
      default: 0
    },
    customPrice: Number,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  customItems: [{
    section: String,
    name: String,
    description: String,
    unit: String,
    userQuantity: Number,
    price: Number,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  totalCost: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed'],
    default: 'draft'
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

userProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UserProject', userProjectSchema);