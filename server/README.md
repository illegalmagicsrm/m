# Maliha's Miracle Backend API

Complete backend API for the Maliha's Miracle e-commerce platform built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Navigate to server directory:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

4. **Start the server:**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📊 Database Setup

### Local MongoDB
```bash
# Install MongoDB locally, then:
mongod --dbpath /path/to/your/db
```

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 🛠 API Endpoints

### Health Check
```
GET /health
```

### Orders
```
POST   /api/orders              # Create new order
GET    /api/orders              # Get all orders (with pagination)
GET    /api/orders/:id          # Get single order
PUT    /api/orders/:id/status   # Update order status
GET    /api/orders/stats/summary # Get order statistics
```

## 📝 API Usage Examples

### Create Order
```javascript
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "product": {
        "id": "1",
        "name": "Organic Coconut Hair Oil",
        "price": 450,
        "image": "https://example.com/image.jpg",
        "category": "hair-care"
      },
      "quantity": 2
    }
  ],
  "total": 900,
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+8801234567890",
    "address": "123 Main St, Dhaka"
  },
  "paymentMethod": "cod",
  "shipping": {
    "cost": 50,
    "method": "standard",
    "address": "123 Main St, Dhaka"
  }
}
```

### Get Orders (with filters)
```javascript
GET /api/orders?page=1&limit=10&status=pending&email=john@example.com
```

## 🔧 Environment Variables

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/malihas-miracle

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## 📦 Project Structure

```
server/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables
├── README.md             # This file
├── models/
│   └── Order.js          # Order model schema
└── routes/
    └── orders.js         # Order routes and controllers
```

## 🧪 Testing the API

### Using curl:
```bash
# Health check
curl http://localhost:5000/health

# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"items":[{"product":{"id":"1","name":"Test Product","price":100,"image":"test.jpg","category":"test"},"quantity":1}],"total":100,"customer":{"name":"Test User","email":"test@example.com"}}'

# Get orders
curl http://localhost:5000/api/orders
```

### Using Postman:
Import the following collection:
- Base URL: `http://localhost:5000`
- Add requests for each endpoint above

## 🚀 Deployment

### Render.com
1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy automatically

### Heroku
```bash
heroku create malihas-miracle-api
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

## 🔒 Security Notes

**Important for Production:**
- Add authentication middleware
- Implement rate limiting
- Add input sanitization
- Use HTTPS only
- Validate all inputs
- Add API key protection for admin routes

## 📈 Monitoring

The API includes:
- Request logging
- Error handling
- Health check endpoint
- Database connection monitoring
- Graceful shutdown handling

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details