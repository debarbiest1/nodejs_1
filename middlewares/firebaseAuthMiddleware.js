const admin = require("../config/firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ code: 401, message: "Access Denied. Please log in." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const userEmail = decodedToken.email; // Get email from token

        console.log("Decoded Token:", decodedToken);

        // 🛑 Check if email exists in Firebase Authentication
        const userRecord = await admin.auth().getUserByEmail(userEmail);
        
        if (!userRecord) {
            return res.status(403).json({ code: 403, message: "Access Denied. Your email is not registered in Firebase." });
        }

        req.user = decodedToken; // Attach user info to request
        next();
    } catch (error) {
        console.error("Firebase Token Verification Failed:", error);
        res.status(403).json({ code: 403, message: "Invalid or expired token. Please log in again." });
    }
};

module.exports = verifyFirebaseToken;
