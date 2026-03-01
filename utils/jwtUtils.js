const jwt = require('jsonwebtoken');

// Generate Access Token with proper validation
const generateToken = (userId) => {
    // Check if JWT_EXPIRE is set, otherwise use default
    const expiresIn = process.env.JWT_EXPIRE || '7d';
    
    // Validate the expiresIn format
    console.log('⏰ Token expiry setting:', expiresIn);
    
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: expiresIn }
    );
};

// Verify Token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Token verification error:', error.message);
        throw new Error('Invalid token');
    }
};

// Optional: Generate token with custom expiry
const generateTokenWithExpiry = (userId, customExpiry) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: customExpiry }
    );
};

module.exports = {
    generateToken,
    verifyToken,
    generateTokenWithExpiry
};