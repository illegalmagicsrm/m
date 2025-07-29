const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import routes
const orderRoutes = require('./routes/orders');

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Maliha\'s Miracle API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/orders', orderRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/malihas-miracle';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// MongoDB connection event listeners
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB Disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB Reconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n🚀 Server Status:');
  console.log(`   ✅ Server running on port ${PORT}`);
  console.log(`   🌐 API URL: http://localhost:${PORT}`);
  console.log(`   🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`   📦 Orders API: http://localhost:${PORT}/api/orders`);
  console.log(`   🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('\n📋 Available Endpoints:');
  console.log('   GET    /health');
  console.log('   POST   /api/orders');
  console.log('   GET    /api/orders');
  console.log('   GET    /api/orders/:id');
  console.log('   PUT    /api/orders/:id/status');
  console.log('   GET    /api/orders/stats/summary');
});