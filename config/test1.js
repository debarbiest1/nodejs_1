const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

console.log(process.env.FIREBASE_CREDENTIALS);

if (!process.env.FIREBASE_CREDENTIALS) {
    throw new Error("❌ FIREBASE_CREDENTIALS environment variable is missing!");
}

const credentials = JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, "base64").toString("utf8"));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(credentials),
    });
    console.log("✅ Firebase Admin Initialized!");
}

admin.auth().listUsers()
  .then((listUsersResult) => {
    listUsersResult.users.forEach((userRecord) => {
      console.log(`User ID: ${userRecord.uid}, Tokens Valid After: ${userRecord.tokensValidAfterTime}`);
    });
  })
  .catch((error) => {
    console.log("❌ Error fetching users:", error);
  });

module.exports = admin;
