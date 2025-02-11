module.exports = (err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        code: 500,
        message: 'Internal Server Error',
    });
};

module.exports = (err, req, res, next) => {
    console.error("🔥 ERROR:", err.message); // Show the actual error
    res.status(500).json({
        code: 500,
        message: err.message || "Internal Server Error",
    });
};
