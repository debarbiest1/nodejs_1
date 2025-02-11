const pool = require('../data/database'); // Ensure the correct import

// Get all doctors
const getDoctors = async () => {
    const { rows } = await pool.query('SELECT * FROM doctors');
    return rows;
};

// Get a doctor by ID
const getDoctorById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM doctors WHERE id = $1', [id]);
    return rows[0] || null;
};

// Add a new doctor
const addDoctor = async ({ name, specialty, contact }) => {
    const { rows } = await pool.query(
        'INSERT INTO doctors (name, specialty, contact) VALUES ($1, $2, $3) RETURNING *',
        [name, specialty, contact]
    );
    return rows[0];
};

// Update doctor information
const updateDoctor = async (id, { name, specialty, contact }) => {
    const { rows } = await pool.query(
        'UPDATE doctors SET name=$1, specialty=$2, contact=$3 WHERE id=$4 RETURNING *',
        [name, specialty, contact, id]
    );
    return rows[0] || null;
};

// Delete a doctor
const deleteDoctor = async (id) => {
    await pool.query('DELETE FROM doctors WHERE id=$1', [id]);
    return { message: 'Doctor deleted successfully' };
};

module.exports = { getDoctors, getDoctorById, addDoctor, updateDoctor, deleteDoctor };
