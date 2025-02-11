const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'clinic_db1',
    password: process.env.PG_PASSWORD || '1111',
    port: process.env.PG_PORT || 5432,
});

pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL successfully"))
    .catch((err) => {
        console.error("❌ PostgreSQL connection error:", err);
        process.exit(1);
    });

module.exports = pool;  // Ensure pool is exported correctly


// Get all patients
const getPatients = async () => {
    const { rows } = await pool.query('SELECT * FROM patients');
    return rows;
};

// Add a new patient
const addPatient = async (newPatient) => {
    const { name, age, gender, contact, address } = newPatient;
    const { rows } = await pool.query(
        'INSERT INTO patients (name, age, gender, contact, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, age, gender, contact, address]
    );
    return rows[0];
};

// Update patient information
const updatePatient = async (id, updatedPatient) => {
    const { name, age, gender, contact, address } = updatedPatient;
    const { rows } = await pool.query(
        'UPDATE patients SET name=$1, age=$2, gender=$3, contact=$4, address=$5 WHERE id=$6 RETURNING *',
        [name, age, gender, contact, address, id]
    );
    return rows[0];
};

// Delete a patient
const deletePatient = async (id) => {
    await pool.query('DELETE FROM patients WHERE id=$1', [id]);
    return { message: 'Patient deleted successfully' };
};

// Get all doctors
const getDoctors = async () => {
    const { rows } = await pool.query('SELECT * FROM doctors');
    return rows;
};

// Add a new doctor
const addDoctor = async (newDoctor) => {
    const { name, specialty, contact } = newDoctor;
    const { rows } = await pool.query(
        'INSERT INTO doctors (name, specialty, contact) VALUES ($1, $2, $3) RETURNING *',
        [name, specialty, contact]
    );
    return rows[0];
};

// Update doctor information
const updateDoctor = async (id, updatedDoctor) => {
    const { name, specialty, contact } = updatedDoctor;
    const { rows } = await pool.query(
        'UPDATE doctors SET name=$1, specialty=$2, contact=$3 WHERE id=$4 RETURNING *',
        [name, specialty, contact, id]
    );
    return rows[0];
};

// Delete a doctor
const deleteDoctor = async (id) => {
    await pool.query('DELETE FROM doctors WHERE id=$1', [id]);
    return { message: 'Doctor deleted successfully' };
};

// Get all appointments
// Get all appointments with patient and doctor details
const getAppointments = async () => {
    const { rows } = await pool.query(`
        SELECT a.id, a.date, a.time, 
               p.name AS patient_name, d.name AS doctor_name, d.specialty 
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        ORDER BY a.date DESC
    `);
    return rows;
};

// Get appointment by ID
    const getAppointmentById = async (id) => {
        const { rows } = await pool.query(
            `SELECT a.id, a.date, a.time, 
                    p.name AS patient_name, d.name AS doctor_name, d.specialty 
            FROM appointments a
            JOIN patients p ON a.patient_id = p.id
            JOIN doctors d ON a.doctor_id = d.id
            WHERE a.id = $1`,
            [id]
        );
        return rows[0] || null;
    };

    // Add a new appointment
    const addAppointment = async ({ patient_id, doctor_id, date, time }) => {
        const { rows } = await pool.query(
            'INSERT INTO appointments (patient_id, doctor_id, date, time) VALUES ($1, $2, $3, $4) RETURNING *',
            [patient_id, doctor_id, date, time]
        );
        return rows[0];
    };

    // Delete an appointment
    const deleteAppointment = async (id) => {
        await pool.query('DELETE FROM appointments WHERE id=$1', [id]);
        return { message: 'Appointment deleted successfully' };
    };

module.exports = {
    getPatients, addPatient, updatePatient, deletePatient,
    getDoctors, addDoctor, updateDoctor, deleteDoctor,
    getAppointments, addAppointment, deleteAppointment
};
