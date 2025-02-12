const pool = require("../data/database"); 

module.exports = async (req, res, next) => {
    const path = req.path;
    const method = req.method;
    const { name, age, gender, contact, address, specialty, patient_id, doctor_id, date, time } = req.body;

    let errors = [];
console.log("🔍 Middleware validateInputs запущен!");

    if (path.includes("patients")) {
        if (method === "POST" || method === "PUT") {
            if (!name || name.length < 2 || name.length > 50) errors.push("Имя должно быть от 2 до 50 символов.");
            if (!age || age < 0 || age > 120) errors.push("Возраст должен быть от 0 до 120.");
            if (gender && !["M", "F", "Other"].includes(gender)) errors.push("Пол должен быть 'M', 'F' или 'Other'.");
            if (!contact || !/^(\+7|8)[0-9]{10}$/.test(contact)) errors.push("Контактный номер должен начинаться с +7 или 8 и содержать 10 цифр.");
            if (!address || address.length < 5) errors.push("Адрес должен содержать минимум 5 символов.");
        }
    }

    if (path.includes("doctors")) {
        if (method === "POST" || method === "PUT") {
            if (!name || name.length < 2 || name.length > 50) errors.push("Имя доктора должно быть от 2 до 50 символов.");
            if (!specialty || specialty.length < 3) errors.push("Специальность должна содержать минимум 3 символа.");
            if (!contact || !/^(\+7|8)[0-9]{10}$/.test(contact)) errors.push("Контактный номер должен начинаться с +7 или 8 и содержать 10 цифр.");
        }
    }

    if (path.includes("appointments")) {
        if (method === "POST" || method === "PUT") {
            if (!patient_id || isNaN(patient_id)) errors.push("ID пациента должно быть числом.");
            if (!doctor_id || isNaN(doctor_id)) errors.push("ID доктора должно быть числом.");
            if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push("Дата должна быть в формате YYYY-MM-DD.");
            if (!time || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) errors.push("Время должно быть в формате HH:MM (24-часовой формат).");

            const currentDate = new Date();
            const appointmentDate = new Date(date);
            if (appointmentDate < currentDate.setHours(0, 0, 0, 0)) {
                errors.push("Нельзя записываться в прошлое время.");
            }

            const [hours, minutes] = time.split(":").map(Number);
            if (hours < 8 || hours > 20) {
                errors.push("Запись возможна только с 08:00 до 20:00.");
            }

        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ code: 400, errors });
    }

    next(); 
};
