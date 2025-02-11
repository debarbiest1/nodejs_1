const pool = require('../data/database');

// Get all patients
const getPatients = async () => {
    const { rows } = await pool.query('SELECT * FROM patients');
    return rows;
};

// Add a new patient
const addPatient = async ({ name, age, gender, contact, address }) => {
    const { rows } = await pool.query(
        'INSERT INTO patients (name, age, gender, contact, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, age, gender, contact, address]
    );
    return rows[0];
};

// Update a patient
const updatePatient = async (id, { name, age, gender, contact, address }) => {
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

module.exports = { getPatients, addPatient, updatePatient, deletePatient };
