const pool = require('../data/database'); // Importing PostgreSQL connection

// Get all appointments
const getAppointments = async () => {
    try {
        const { rows } = await pool.query( `SELECT a.id, a.date, a.time, 
            p.name AS patient_name, d.name AS doctor_name, d.specialty 
     FROM appointments a
     JOIN patients p ON a.patient_id = p.id
     JOIN doctors d ON a.doctor_id = d.id
     ORDER BY a.date DESC`);
        return rows;
    } catch (error) {
        console.error("Database Error in getAppointments:", error);
        throw error;
    }
};


// Add a new appointment
const addAppointment = async ({ patient_id, doctor_id, date, time }) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO appointments (patient_id, doctor_id, date, time) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [patient_id, doctor_id, date, time]
        );
        return rows[0];
    } catch (error) {
        console.error("Database Error in addAppointment:", error);
        throw error;
    }
};

// Update an appointment
const updateAppointment = async (id, updatedData) => {
    const { date, time } = updatedData;
    try {
        const { rows } = await pool.query(
            `UPDATE appointments SET date=$1, time=$2 WHERE id=$3 RETURNING *`,
            [date, time, id]
        );
        return rows[0];
    } catch (error) {
        console.error("Database Error in updateAppointment:", error);
        throw error;
    }
};

// Delete an appointment
const deleteAppointment = async (id) => {
    try {
        await pool.query('DELETE FROM appointments WHERE id=$1', [id]);
        return { message: 'Appointment deleted successfully' };
    } catch (error) {
        console.error("Database Error in deleteAppointment:", error);
        throw error;
    }
};

module.exports = { getAppointments, addAppointment, updateAppointment, deleteAppointment };
