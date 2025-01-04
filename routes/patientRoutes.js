const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientControllers');
const validatePatient = require('../middlewares/validatePatients');

router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.post('/', validatePatient, patientController.createPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;
