const admin = require("firebase-admin");
const serviceAccount = require("./firebase-admin-sdk.json"); // Replace with your path

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

module.exports = admin;
