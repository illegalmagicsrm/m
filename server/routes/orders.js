const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { items, total, customer, paymentMethod, shipping } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    if (!total || total <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Order total must be greater than 0'
      });
    }

    if (!customer || !customer.name || !customer.email) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and email are required'
      });
    }

    // Validate items structure
    for (const item of items) {
      if (!item.product || !item.product.id || !item.product.name || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Invalid item structure in order'
        });
      }
    }

    // Create new order
    const newOrder = new Order({
      items,
      total,
      customer,
      paymentMethod: paymentMethod || 'cod',
      shipping: shipping || { cost: 0, method: 'standard' }
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: savedOrder._id,
        orderNumber: savedOrder.orderNumber,
        total: savedOrder.total,
        status: savedOrder.status,
        createdAt: savedOrder.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (for admin)
// @access  Public (should be protected in production)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, email } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (email) filter['customer.email'] = email;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get orders with pagination
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(parseInt(limit))
      .lean(); // For better performance

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / parseInt(limit));

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalOrders,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Public (should be protected in production)
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Public (should be protected in production)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
});

// @route   GET /api/orders/stats/summary
// @desc    Get order statistics for admin dashboard
// @access  Public (should be protected in production)
router.get('/stats/summary', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const completedOrders = await Order.countDocuments({ status: 'delivered' });
    
    // Calculate total revenue
    const revenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]);
    
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber customer.name total status createdAt');

    res.json({
      success: true,
      data: {
        summary: {
          totalOrders,
          pendingOrders,
          completedOrders,
          totalRevenue
        },
        recentOrders
      }
    });

  } catch (error) {
    console.error('Error fetching order stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order statistics'
    });
  }
});

module.exports = router;