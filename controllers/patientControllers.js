const db = require('../data/database'); 

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await db.getPatients();
        res.json({ code: 200, content: patients });
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patientId = parseInt(req.params.id, 10);
        const patients = await db.getPatients();
        const patient = patients.find((p) => p.id === patientId);

        if (!patient) {
            return res.status(404).json({ code: 404, message: "Patient not found." });
        }

        res.json({ code: 200, content: patient });
    } catch (error) {
        console.error("Error fetching patient by ID:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

exports.createPatient = async (req, res) => {
    try {
        const { name, age, gender, contact, address } = req.body;
        const newPatient = await db.addPatient({ name, age, gender, contact, address });

        res.status(201).json({ code: 201, content: newPatient });
    } catch (error) {
        console.error("Error creating patient:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const patientId = parseInt(req.params.id, 10);
        const updatedPatient = await db.updatePatient(patientId, req.body);

        if (!updatedPatient) {
            return res.status(404).json({ code: 404, message: "Patient not found." });
        }

        res.status(200).json({ code: 200, content: updatedPatient });
    } catch (error) {
        console.error("Error updating patient:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const patientId = parseInt(req.params.id, 10);
        await db.deletePatient(patientId);
        res.json({ code: 200, message: "Patient deleted successfully." });
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};
