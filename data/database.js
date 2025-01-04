const fs = require('fs');
const path = require('path');

// File path for the patients JSON
const filePath = path.join(__dirname, 'patients.json');

// Helper function to load patients from the JSON file
const loadPatients = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If the file doesn't exist or is empty, return an empty array
        console.error('Error loading patients:', error);
        return [];
    }
};

// Helper function to save patients to the JSON file
const savePatients = (patients) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(patients, null, 2), 'utf8');
    } catch (error) {
        console.error('Error saving patients:', error);
    }
};

let patients = loadPatients(); // Load existing patients
let nextId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;

const incrementNextId = () => nextId++;

module.exports = {
    getPatients: () => patients,
    addPatient: (newPatient) => {
        patients.push(newPatient);
        savePatients(patients); // Save changes to the file
    },
    updatePatient: (updatedPatients) => {
        patients = updatedPatients;
        savePatients(patients); // Save changes to the file
    },
    nextId: incrementNextId,
};