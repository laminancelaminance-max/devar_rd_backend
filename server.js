const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');  // ADD THIS
const itemRoutes = require('./routes/items');          // ADD THIS
const projectRoutes = require('./routes/userProjects'); // ADD THIS

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);  // ADD THIS
app.use('/api/items', itemRoutes);            // ADD THIS
app.use('/api/projects', projectRoutes);      // ADD THIS

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true,
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// 🔧 FIXED: 404 handler for undefined routes - remove the '*'
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('\n=================================');
    console.log('🚀 Server Started Successfully');
    console.log('=================================');
    console.log(`📍 Port: ${PORT}`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log(`💊 Health: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
    console.log(`📋 Categories: http://localhost:${PORT}/api/categories`);
    console.log(`📦 Items: http://localhost:${PORT}/api/items`);
    console.log(`📁 Projects: http://localhost:${PORT}/api/projects`);
    console.log('=================================\n');
});