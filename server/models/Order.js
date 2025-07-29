const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    product: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true }
    },
    quantity: { type: Number, required: true, min: 1 }
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  customer: {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: { type: String, trim: true },
    address: { type: String, trim: true }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'online'],
    default: 'cod'
  },
  shipping: {
    cost: { type: Number, default: 0 },
    method: { type: String, default: 'standard' },
    address: { type: String }
  },
  orderNumber: {
    type: String,
    unique: true
  }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `MM${Date.now().toString().slice(-6)}${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

// Add indexes for better query performance
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'customer.email': 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderNumber: 1 });

module.exports = mongoose.model('Order', orderSchema);