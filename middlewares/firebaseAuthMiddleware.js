const admin = require("firebase-admin");
const pool = require("../data/database");

const verifyFirebaseToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split("Bearer ")[1];
        const device_id = req.headers["device-id"];

        if (!token || !device_id) {
            return res.status(401).json({ message: "Unauthorized: No token or device ID provided" });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;

        const result = await pool.query(
            "SELECT token FROM user_tokens WHERE user_id = $1 AND device_id = $2",
            [decodedToken.uid, device_id]
        );

        if (result.rowCount === 0 || result.rows[0].token !== token) {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }

        next();
    } catch (error) {
        console.error("❌ Firebase Token Verification Error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = verifyFirebaseToken;
