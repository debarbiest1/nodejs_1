const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables

const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const errorHandler = require('./middlewares/errorHandlers');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve Static Files
app.use(express.static('public'));

// Routes for Frontend Pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/managepatients', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/manage', (req, res) => res.sendFile(path.join(__dirname, 'adminpanel.html')));
app.get('/managedoctors', (req, res) => res.sendFile(path.join(__dirname, 'doctors.html')));
app.get('/manageappointments', (req, res) => res.sendFile(path.join(__dirname, 'appointments.html')));

// API Routes
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
