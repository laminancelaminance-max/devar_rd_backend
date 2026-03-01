// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Log the received data for debugging
        console.log('📝 Registration attempt:', { username, email });

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide all fields' 
            });
        }

        // Check if user exists
        const userExists = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (userExists) {
            return res.status(400).json({ 
                success: false,
                message: userExists.email === email 
                    ? 'Email already exists' 
                    : 'Username already exists'
            });
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password
        });

        console.log('✅ User created successfully:', user._id);

        // Generate token with error handling
        let token;
        try {
            token = generateToken(user._id);
            console.log('🔑 Token generated successfully');
        } catch (tokenError) {
            console.error('❌ Token generation error:', tokenError.message);
            // Even if token fails, user is created - return user without token
            return res.status(201).json({
                success: true,
                token: null,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt
                },
                warning: 'Account created but token generation failed. Please login.'
            });
        }

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('❌ Registration error:', error);
        
        // Handle duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                success: false,
                message: `${field} already exists`
            });
        }

        // Handle validation error
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false,
                message: messages.join(', ')
            });
        }

        // Handle JWT errors specifically
        if (error.message.includes('expiresIn')) {
            return res.status(500).json({ 
                success: false,
                message: 'Server configuration error. Please contact support.'
            });
        }

        res.status(500).json({ 
            success: false,
            message: 'Server error during registration' 
        });
    }
};