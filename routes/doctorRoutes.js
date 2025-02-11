const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorControllers');

router.get('/', doctorController.getAllDoctors); // Получить всех докторов
router.get('/:id', doctorController.getDoctorById); // Получить доктора по ID
router.post('/', doctorController.createDoctor); // Добавить нового доктора
router.put('/:id', doctorController.updateDoctor); // Обновить информацию о докторе
router.delete('/:id', doctorController.deleteDoctor); // Удалить доктора по ID

module.exports = router;

