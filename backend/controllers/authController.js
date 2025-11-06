// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');  // Adjust the path if needed

// // Register a new user
// exports.register = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Check if the user already exists
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//         });

//         // Save the user to the database
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// // Login a user
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Compare password with the hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Create a JWT token
//         const token = jwt.sign(
//             { userId: user._id, email: user.email },
//             process.env.JWT_SECRET,  // Store your JWT secret in an environment variable
//             { expiresIn: '1h' }  // Token expires in 1 hour
//         );

//         res.status(200).json({
//             message: 'Login successful',
//             token
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// // Get current logged-in user (for example, to verify the token)
// exports.getCurrentUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId).select('-password');
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust the path if needed

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not set in environment variables');
        return res.status(500).json({ message: 'Server configuration error' });
    }

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Create a JWT token for the new user
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            message: 'User registered successfully',
            token,
            userName: newUser.name
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ 
            message: 'Server Error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not set in environment variables');
        return res.status(500).json({ message: 'Server configuration error' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,  // Store your JWT secret in an environment variable
            { expiresIn: '1h' }  // Token expires in 1 hour
        );

        // Send back user details along with the token
        res.status(200).json({
            message: 'Login successful',
            token,
            userName: user.name,  // Send the user's name
            userRole: user.role    // Send the user's role if needed
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Server Error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get current logged-in user (for example, to verify the token)
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Send back the user data (name and role)
        res.status(200).json({
            userName: user.name,   // Send userName
            userRole: user.role    // Send userRole
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
