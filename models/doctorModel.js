const pool = require('../data/database'); 

const getDoctors = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM doctors');
        return rows;
    } catch (error) {
        console.error("❌ Error fetching doctors:", error);
        throw new Error("Database error while fetching doctors");
    }
};

const getDoctorById = async (id) => {
    try {
        const { rows } = await pool.query('SELECT * FROM doctors WHERE id = $1', [id]);
        if (rows.length === 0) {
            throw new Error(`Doctor with ID ${id} not found`);
        }
        return rows[0];
    } catch (error) {
        console.error("❌ Error fetching doctor:", error);
        throw new Error("Database error while fetching doctor");
    }
};

const addDoctor = async ({ name, specialty, contact }) => {
    try {
        if (!name || !specialty || !contact) {
            throw new Error("All fields (name, specialty, contact) are required");
        }

        const { rows } = await pool.query(
            'INSERT INTO doctors (name, specialty, contact) VALUES ($1, $2, $3) RETURNING *',
            [name, specialty, contact]
        );
        return rows[0];
    } catch (error) {
        console.error("❌ Error adding doctor:", error);
        throw new Error("Database error while adding doctor");
    }
};

const updateDoctor = async (id, { name, specialty, contact }) => {
    try {
        const check = await pool.query('SELECT * FROM doctors WHERE id=$1', [id]);
        if (check.rowCount === 0) {
            throw new Error(`Doctor with ID ${id} not found`);
        }

        const { rows } = await pool.query(
            'UPDATE doctors SET name=$1, specialty=$2, contact=$3 WHERE id=$4 RETURNING *',
            [name, specialty, contact, id]
        );
        return rows[0];
    } catch (error) {
        console.error("❌ Error updating doctor:", error);
        throw new Error("Database error while updating doctor");
    }
};

const deleteDoctor = async (id) => {
    try {
        const check = await pool.query('SELECT * FROM doctors WHERE id=$1', [id]);
        if (check.rowCount === 0) {
            throw new Error(`Doctor with ID ${id} not found`);
        }

        await pool.query('DELETE FROM doctors WHERE id=$1', [id]);
        return { message: 'Doctor deleted successfully' };
    } catch (error) {
        console.error("❌ Error deleting doctor:", error);
        throw new Error("Database error while deleting doctor");
    }
};

module.exports = { getDoctors, getDoctorById, addDoctor, updateDoctor, deleteDoctor };
