const isAdmin = async (req, res, next) => {
    try {
        if (!req.admin || !req.admin.isAdmin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = isAdmin;   
