// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const path = require('path');

// // Load environment variables
// dotenv.config();

// // Import database connection
// const connectDB = require('./config/db');

// // Import routes
// const authRoutes = require('./routes/auth');
// const categoryRoutes = require('./routes/categories');
// const itemRoutes = require('./routes/items');
// const projectRoutes = require('./routes/userProjects');

// // Connect to MongoDB
// // connectDB();

// const app = express();

// app.use('/api', async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (err) {
//     console.error("❌ DB Connection Failed:", err.message);
//     res.status(500).json({ error: "Database connection failed" });
//   }
// });

// /* ---------------------------
//    GLOBAL MIDDLEWARE
// ----------------------------*/

// // CORS configuration - UPDATED with your domain
// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://localhost:3000',
//   'http://127.0.0.1:5173',
//   'https://www.devarrd.com',
//   'https://devarrd.com',
//   'https://api.devarrd.com'  // If using subdomain
// ];

// app.use(
//   cors({
//     origin: function(origin, callback) {
//       // Allow requests with no origin (like mobile apps, curl)
//       if (!origin) return callback(null, true);
      
//       if (allowedOrigins.indexOf(origin) === -1) {
//         console.log('❌ Blocked origin:', origin);
//         return callback(new Error('CORS not allowed'), false);
//       }
//       console.log('✅ Allowed origin:', origin);
//       return callback(null, true);
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

// // Body parser
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Request logger
// app.use((req, res, next) => {
//   console.log(`📥 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
//   next();
// });

// /* ---------------------------
//    HEALTH CHECK
// ----------------------------*/

// app.get('/api/health', async (req, res) => {
//   await connectDB();

//   res.json({
//     success: true,
//     status: 'OK',
//     message: 'Server is running on devarrd.com',
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'production',
//     database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
//   });
// });

// /* ---------------------------
//    DEBUG ROUTE
// ----------------------------*/

// app.get('/api/debug/count', async (req, res) => {
//   try {
//     const Category = require('./models/Category');
//     const UserProject = require('./models/UserProject');

//     const categoryCount = await Category.countDocuments();
//     const projectCount = await UserProject.countDocuments();
//     const categories = await Category.find().select('name _id');

//     res.json({
//       success: true,
//       counts: {
//         categories: categoryCount,
//         projects: projectCount,
//       },
//       categories: categories.map((c) => ({
//         id: c._id,
//         name: c.name,
//       })),
//       dbName: mongoose.connection.name,
//       dbHost: mongoose.connection.host,
//       dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
//     });
//   } catch (err) {
//     console.error('❌ Debug route error:', err);
//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// });

// // server.js mein yeh route add karo (temporary)
// app.get('/api/debug/project/:id', async (req, res) => {
//   try {
//     const UserProject = require('./models/UserProject');
//     const project = await UserProject.findById(req.params.id);
    
//     if (!project) {
//       return res.status(404).json({ error: 'Project not found' });
//     }
    
//     res.json({
//       id: project._id,
//       projectName: project.projectName,
//       itemsCovered: project.itemsCovered,
//       itemsCoveredCount: project.itemsCovered?.length || 0,
//       raw: project
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// /* ---------------------------
//    API ROUTES
// ----------------------------*/

// app.use('/api/auth', authRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/items', itemRoutes);
// app.use('/api/projects', projectRoutes);

// /* ---------------------------
//    SERVE FRONTEND STATIC FILES (if same domain)
//    Yeh tab use hoga jab frontend bhi backend ke saath same folder mein ho
// ----------------------------*/

// // For production - serve static files
// if (process.env.NODE_ENV === 'production') {
//   // Path to frontend build folder
//   const frontendPath = path.join(__dirname, '../frontend/dist');
  
//   // Check if frontend build exists
//   const fs = require('fs');
//   if (fs.existsSync(frontendPath)) {
//     console.log('📁 Serving frontend from:', frontendPath);
//     app.use(express.static(frontendPath));
    
//     // Any route not matching API will serve frontend
//     app.get('*', (req, res, next) => {
//       // Skip API routes
//       if (req.path.startsWith('/api/')) {
//         return next();
//       }
//       res.sendFile(path.join(frontendPath, 'index.html'));
//     });
//   } else {
//     console.log('⚠️ Frontend build not found at:', frontendPath);
//   }
// }

// /* ---------------------------
//    404 HANDLER - For API routes only
// ----------------------------*/

// app.use('/api', (req, res) => {
//   // Only handle routes that start with /api but weren't matched
//   if (req.path.startsWith('/api/')) {
//     res.status(404).json({
//       success: false,
//       message: `API route not found: ${req.method} ${req.originalUrl}`,
//     });
//   } else {
//     // Let other routes pass through
//     res.status(404).json({
//       success: false,
//       message: `Route not found: ${req.method} ${req.originalUrl}`,
//     });
//   }
// });



// /* ---------------------------
//    ERROR HANDLER
// ----------------------------*/

// app.use((err, req, res, next) => {
//   console.error('❌ Server Error:', err.stack);

//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined,
//   });
// });

// /* ---------------------------
//    SERVER START
// ----------------------------*/

// const PORT = process.env.PORT || 5000;

// // Only start server if not in serverless environment
// if (require.main === module) {
//   app.listen(PORT, () => {
//     console.log('\n=================================');
//     console.log('🚀 Server Started Successfully');
//     console.log('=================================');
//     console.log(`📍 Port: ${PORT}`);
//     console.log(`🌍 Domain: https://devarrd.com`);
//     console.log(`🔗 API URL: https://devarrd.com/api`);
//     console.log(`💊 Health: https://devarrd.com/api/health`);
//     console.log(`🔐 Auth: https://devarrd.com/api/auth`);
//     console.log(`📋 Categories: https://devarrd.com/api/categories`);
//     console.log(`📁 Projects: https://devarrd.com/api/projects`);
//     console.log(`🌎 Environment: ${process.env.NODE_ENV || 'production'}`);
//     console.log('=================================\n');
//   });
// }

// // Export for serverless (if needed)
// module.exports = app;



const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
dotenv.config();

// DB
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const itemRoutes = require('./routes/items');
const projectRoutes = require('./routes/userProjects');

const app = express();

/* ---------------------------
   GLOBAL MIDDLEWARE
----------------------------*/

// ✅ CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://www.devarrd.com',
  'https://devarrd.com',
  'https://api.devarrd.com',
  'http://devarrd.com',           
  'http://www.devarrd.com'   
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (!allowedOrigins.includes(origin)) {
        console.log('❌ Blocked origin:', origin);
        return callback(new Error('CORS not allowed'), false);
      }

      console.log('✅ Allowed origin:', origin);
      return callback(null, true);
    },
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Logger
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

// ✅ DB Middleware (ONLY for API)
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    res.status(500).json({ error: "Database connection failed" });
  }
});

/* ---------------------------
   HEALTH CHECK
----------------------------*/

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    message: 'Server is running on devarrd.com',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

/* ---------------------------
   DEBUG ROUTES
----------------------------*/

app.get('/api/debug/count', async (req, res) => {
  try {
    const Category = require('./models/Category');
    const UserProject = require('./models/UserProject');

    const categoryCount = await Category.countDocuments();
    const projectCount = await UserProject.countDocuments();
    const categories = await Category.find().select('name _id');

    res.json({
      success: true,
      counts: {
        categories: categoryCount,
        projects: projectCount,
      },
      categories: categories.map((c) => ({
        id: c._id,
        name: c.name,
      })),
      dbName: mongoose.connection.name,
      dbHost: mongoose.connection.host,
      dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
  } catch (err) {
    console.error('❌ Debug route error:', err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.get('/api/debug/project/:id', async (req, res) => {
  try {
    const UserProject = require('./models/UserProject');
    const project = await UserProject.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      id: project._id,
      projectName: project.projectName,
      itemsCovered: project.itemsCovered,
      itemsCoveredCount: project.itemsCovered?.length || 0,
      raw: project
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------
   API ROUTES
----------------------------*/

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/projects', projectRoutes);

/* ---------------------------
   STATIC FRONTEND (OPTIONAL)
----------------------------*/

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  const fs = require('fs');

  if (fs.existsSync(frontendPath)) {
    console.log('📁 Serving frontend from:', frontendPath);
    app.use(express.static(frontendPath));

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      res.sendFile(path.join(frontendPath, 'index.html'));
    });
  }
}

/* ---------------------------
   404 HANDLER
----------------------------*/

app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* ---------------------------
   ERROR HANDLER
----------------------------*/

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);

  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  });
});

/* ---------------------------
   SERVER START (LOCAL ONLY)
----------------------------*/

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// ✅ Export for Vercel
module.exports = app;