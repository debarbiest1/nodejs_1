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
const { loginUser, logoutUser } = require("./controllers/authController");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post("/auth/login", loginUser);
app.post("/auth/logout", verifyFirebaseToken, logoutUser);

app.use(validateInputs);
app.use("/patients", validateInputs, patientRoutes);
app.use("/doctors", validateInputs, verifyFirebaseToken, doctorRoutes);
app.use("/appointments", validateInputs, appointmentRoutes);

app.get("/verify-token", verifyFirebaseToken, (req, res) => {
    res.status(200).json({ code: 200, message: "Token is valid", user: req.user });
});

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/managepatients', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/manage', (req, res) => res.sendFile(path.join(__dirname, 'adminpanel.html')));
app.get('/managedoctors', (req, res) => res.sendFile(path.join(__dirname, 'doctors.html')));
app.get('/manageappointments', (req, res) => res.sendFile(path.join(__dirname, 'appointments.html')));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
