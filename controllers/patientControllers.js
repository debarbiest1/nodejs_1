const { getPatients, addPatient, updatePatient, nextId } = require('../data/database');

exports.getAllPatients = (req, res) => {
    res.json({ code: 200, content: getPatients() });
}; 



exports.getPatientById = (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    const patients = getPatients();
    const patient = patients.find((p) => p.id === patientId);

    if (!patient) {
        return res.status(404).json({ code: 404, message: 'Patient not found.' });
    }

    res.json({ code: 200, content: patient });
};

exports.createPatient = (req, res) => {
    const { name, age, gender, contact, address } = req.body;

    const newPatient = {
        id: nextId(),
        name,
        age,
        gender,
        contact,
        address,
    };

    addPatient(newPatient);
    res.status(201).json({ code: 201, content: newPatient });
};

exports.updatePatient = (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    const { name, age, gender, contact, address } = req.body;

    const patients = getPatients();
    const patient = patients.find((p) => p.id === patientId);

    if (!patient) {
        return res.status(404).json({ code: 404, message: 'Patient not found.' });
    }

    if (name !== undefined) patient.name = name;
    if (age !== undefined) patient.age = age;
    if (gender !== undefined) patient.gender = gender;
    if (contact !== undefined) patient.contact = contact;
    if (address !== undefined) patient.address = address;

    updatePatient(patients);
    res.status(200).json({ code: 200, content: patient });
};

exports.deletePatient = (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    let patients = getPatients();
    const index = patients.findIndex((p) => p.id === patientId);

    if (index === -1) {
        return res.status(404).json({ code: 404, message: 'Patient not found.' });
    }

    patients.splice(index, 1);
    updatePatient(patients);
    res.json({ code: 200, message: 'Patient deleted successfully.' });
};
