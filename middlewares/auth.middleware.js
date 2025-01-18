// middlewares/auth.middleware.js

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    
    try {
        // Add JWT verification here if needed
        // req.user = { id: '123', name: 'John Doe' }; // Example
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid token' });
    }
};
