module.exports = (req, res, next) => {
    const { name, age, gender, contact, address } = req.body;

    if (!name || !age || !gender || !contact || !address) {
        return res.status(400).json({ code: 400, message: 'All fields are required.' });
    }

    next(); 
};
