const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('\n=================================');
        console.log('✅ MongoDB Connected Successfully');
        console.log('=================================');
        console.log(`📊 Database: ${conn.connection.name}`);
        console.log(`🌐 Host: ${conn.connection.host}`);
        console.log(`🔌 Port: ${conn.connection.port}`);
        console.log('=================================\n');
        
    } catch (error) {
        console.error('\n❌ MongoDB Connection Error:');
        console.error('=================================');
        console.error(error.message);
        console.error('=================================\n');
        process.exit(1);
    }
};

module.exports = connectDB;