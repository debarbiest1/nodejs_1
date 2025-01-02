const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Adjust the path if needed
});

// In-memory database
let patients = [];
let nextId = 1;

// Routes
// Create Patient
app.post('/patients', (req, res) => {
    const { name, age, gender, contact, address } = req.body;

    if (!name || !age || !gender || !contact || !address) {
        return res.status(400).json({ code: 400, message: 'All fields are required.' });
    }

    const newPatient = {
        id: nextId++,
        name,
        age,
        gender,
        contact,
        address,
    };

    patients.push(newPatient);
    res.status(201).json({ code: 201, content: newPatient });
});

// Read All Patients
app.get('/patients', (req, res) => {
    res.json({ code: 200, content: patients });
});

// Read Single Patient
app.get('/patients/:id', (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    const patient = patients.find((p) => p.id === patientId);

    if (!patient) {
        return res.status(404).json({ code: 404, message: 'Patient not found.' });
    }

    res.json({ code: 200, content: patient });
});

// Update Patient
app.put('/patients/:id', (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    const { name, age, gender, contact, address } = req.body;

    const patient = patients.find((p) => p.id === patientId);

    if (!patient) {
        return res.status(404).json({ code: 404, message: 'Patient not found))).' });
    }

    if (name) patient.name = name;
    if (age) patient.age = age;
    if (gender) patient.gender = gender;
    if (contact) patient.contact = contact;
    if (address) patient.address = address;

    res.json({ code: 200, content: patient });
});

// Delete Patient
app.delete('/patients/:id', (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    const index = patients.findIndex((p) => p.id === patientId);

    if (index === -1) {
        return res.status(404).json({ code: 404, message: 'Patient not found.' });
    }

    patients.splice(index, 1);
    res.json({ code: 200, message: 'Patient deleted successfully!!!!!!!!!!!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
