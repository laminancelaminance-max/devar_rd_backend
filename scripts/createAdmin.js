require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin already exists:', adminExists.email);
      return;
    }

    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'Admin123!',
      role: 'admin'
    });

    console.log('✅ Admin created:', admin.email);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();