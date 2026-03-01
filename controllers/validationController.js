const User = require('../models/User');

// @desc    Check if username is available
// @route   POST /api/validate/username
// @access  Public
exports.checkUsername = async (req, res) => {
    try {
        const { username } = req.body;
        
        if (!username || username.length < 3) {
            return res.json({
                success: true,
                available: false,
                message: 'Username must be at least 3 characters'
            });
        }
        
        const user = await User.findOne({ username });
        
        res.json({
            success: true,
            available: !user,
            message: user ? 'Username already taken' : 'Username available'
        });
    } catch (error) {
        console.error('Check username error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
};

// @desc    Check if email is available
// @route   POST /api/validate/email
// @access  Public
exports.checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email || !email.includes('@')) {
            return res.json({
                success: true,
                available: false,
                message: 'Invalid email format'
            });
        }
        
        const user = await User.findOne({ email });
        
        res.json({
            success: true,
            available: !user,
            message: user ? 'Email already registered' : 'Email available'
        });
    } catch (error) {
        console.error('Check email error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
};