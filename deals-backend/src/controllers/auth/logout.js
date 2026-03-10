const logoutUser = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            partitioned: true,
            expires: new Date(0)
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = logoutUser
