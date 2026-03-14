const User = require('../../model/user.model')

const getUserCount = async (req , res) =>{
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json({ 
            success: true,
            count: totalUsers 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch user count",
            error: err.message 
        });
    }
}

module.exports = getUserCount;