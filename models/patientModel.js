const pool = require('../data/database');

// ✅ Get all patients
const getPatients = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM patients');
        return rows;
    } catch (error) {
        console.error("❌ Error fetching patients:", error);
        throw new Error("Database error while fetching patients");
    }
};

// ✅ Add a new patient (with validation)
const addPatient = async ({ name, age, gender, contact, address }) => {
    try {
        if (!name || !age || !gender || !contact || !address) {
            throw new Error("All fields (name, age, gender, contact, address) are required");
        }

        const { rows } = await pool.query(
            'INSERT INTO patients (name, age, gender, contact, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, age, gender, contact, address]
        );
        return rows[0];
    } catch (error) {
        console.error("❌ Error adding patient:", error);
        throw new Error("Database error while adding patient");
    }
};

// ✅ Update a patient (check if patient exists first)
const updatePatient = async (id, { name, age, gender, contact, address }) => {
    try {
        // Check if patient exists
        const check = await pool.query('SELECT * FROM patients WHERE id=$1', [id]);
        if (check.rowCount === 0) {
            throw new Error(`Patient with ID ${id} not found`);
        }

        const { rows } = await pool.query(
            'UPDATE patients SET name=$1, age=$2, gender=$3, contact=$4, address=$5 WHERE id=$6 RETURNING *',
            [name, age, gender, contact, address, id]
        );
        return rows[0];
    } catch (error) {
        console.error("❌ Error updating patient:", error);
        throw new Error("Database error while updating patient");
    }
};

// ✅ Delete a patient (check if patient exists first)
const deletePatient = async (id) => {
    try {
        // Check if patient exists
        const check = await pool.query('SELECT * FROM patients WHERE id=$1', [id]);
        if (check.rowCount === 0) {
            throw new Error(`Patient with ID ${id} not found`);
        }

        await pool.query('DELETE FROM patients WHERE id=$1', [id]);
        return { message: 'Patient deleted successfully' };
    } catch (error) {
        console.error("❌ Error deleting patient:", error);
        throw new Error("Database error while deleting patient");
    }
};

module.exports = { getPatients, addPatient, updatePatient, deletePatient };
