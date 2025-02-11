const db = require('../data/database'); // Using PostgreSQL connection

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await db.getAppointments();
        res.json({ code: 200, content: appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};


// Get an appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointmentId = parseInt(req.params.id, 10);
        const appointments = await db.getAppointments();
        const appointment = appointments.find((a) => a.id === appointmentId);

        if (!appointment) {
            return res.status(404).json({ code: 404, message: "Appointment not found." });
        }

        res.json({ code: 200, content: appointment });
    } catch (error) {
        console.error("Error fetching appointment by ID:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { patient_id, doctor_id, date, time } = req.body;

        // Validate input
        if (!patient_id || !doctor_id || !date || !time) {
            return res.status(400).json({ code: 400, message: "All fields are required." });
        }

        const newAppointment = await db.addAppointment({ patient_id, doctor_id, date, time });

        res.status(201).json({ code: 201, content: newAppointment });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const appointmentId = parseInt(req.params.id, 10);
        const updatedAppointment = await db.updateAppointment(appointmentId, req.body);

        if (!updatedAppointment) {
            return res.status(404).json({ code: 404, message: "Appointment not found." });
        }

        res.status(200).json({ code: 200, content: updatedAppointment });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const appointmentId = parseInt(req.params.id, 10);
        await db.deleteAppointment(appointmentId);
        res.json({ code: 200, message: "Appointment deleted successfully." });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};
