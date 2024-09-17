import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'; // Assuming you have a User model

// Login function
export const login = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide both username and password" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        

        // Responding with success (no token generated)
        res.status(200).json({ success: true, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Logout function
export const logout = (req, res) => {
    // Since there's no session or token, simply respond with a logout success message
    res.status(200).json({ success: true, message: "Logged out successfully" });
};
