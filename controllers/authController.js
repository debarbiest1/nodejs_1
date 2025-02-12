const admin = require("firebase-admin");
const pool = require("../data/database");

const loginUser = async (req, res) => {
    try {
        const { idToken, device_id } = req.body;
        console.log("a");
        
        if (!idToken || !device_id) {
            return res.status(400).json({ message: "Missing token or device ID" });
        }
        console.log("b");
        
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid } = decodedToken; 
        
        const existingToken = await pool.query(
            "SELECT * FROM user_tokens WHERE user_id = $1 AND device_id = $2",
            [uid, device_id]
        );

        if (existingToken.rowCount > 0) {
            await pool.query(
                "UPDATE user_tokens SET token = $1, created_at = NOW() WHERE user_id = $2 AND device_id = $3",
                [idToken, uid, device_id]
            );
        } else {
            await pool.query(
                "INSERT INTO user_tokens (user_id, device_id, token) VALUES ($1, $2, $3)",
                [uid, device_id, idToken]
            );
        }

        return res.json({ message: "Login successful", uid });
    } catch (error) {
        console.error("❌ Login Error:", error);
        return res.status(500).json({ message: "Authentication failed" });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { uid, device_id } = req.user; 

        await pool.query(
            "DELETE FROM user_tokens WHERE user_id = $1 AND device_id = $2",
            [uid, device_id]
        );

        return res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("❌ Logout Error:", error);
        return res.status(500).json({ message: "Failed to logout" });
    }
};

module.exports = { loginUser, logoutUser };
