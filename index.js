const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const verifyFirebaseToken = require("./middlewares/firebaseAuthMiddleware");
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const errorHandler = require('./middlewares/errorHandlers');
const validateInputs = require("./middlewares/validateInputs");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// 🔒 Restrict all API routes to authenticated users in Firebase Auth
// API Routes
app.use(validateInputs);
// ✅ Добавляем middleware перед маршрутами
app.use("/patients", validateInputs, patientRoutes);
app.use("/doctors", validateInputs, doctorRoutes);
app.use("/appointments", validateInputs, appointmentRoutes);


// 🔒 Route to verify token
app.get("/verify-token", verifyFirebaseToken, (req, res) => {
    res.status(200).json({ code: 200, message: "Token is valid", user: req.user });
});

// Serve Static Files
app.use(express.static('public'));

// Routes for Frontend Pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/managepatients', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/manage', (req, res) => res.sendFile(path.join(__dirname, 'adminpanel.html')));
app.get('/managedoctors', (req, res) => res.sendFile(path.join(__dirname, 'doctors.html')));
app.get('/manageappointments', (req, res) => res.sendFile(path.join(__dirname, 'appointments.html')));

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});

