const db = require('../data/database'); 

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await db.getDoctors();
        res.json({ code: 200, content: doctors });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctorId = parseInt(req.params.id, 10);
        const doctors = await db.getDoctors();
        const doctor = doctors.find((d) => d.id === doctorId);

        if (!doctor) {
            return res.status(404).json({ code: 404, message: "Doctor not found." });
        }

        res.json({ code: 200, content: doctor });
    } catch (error) {
        console.error("Error fetching doctor by ID:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const { name, specialty, contact } = req.body;
        const newDoctor = await db.addDoctor({ name, specialty, contact });

        res.status(201).json({ code: 201, content: newDoctor });
    } catch (error) {
        console.error("Error creating doctor:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const doctorId = parseInt(req.params.id, 10);
        const updatedDoctor = await db.updateDoctor(doctorId, req.body);

        if (!updatedDoctor) {
            return res.status(404).json({ code: 404, message: "Doctor not found." });
        }

        res.status(200).json({ code: 200, content: updatedDoctor });
    } catch (error) {
        console.error("Error updating doctor:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const doctorId = parseInt(req.params.id, 10);
        await db.deleteDoctor(doctorId);
        res.json({ code: 200, message: "Doctor deleted successfully." });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};
