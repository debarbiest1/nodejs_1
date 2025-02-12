module.exports = (err, req, res, next) => {
    console.error("🔥 Error caught:", err.message || err);

    let statusCode = err.statusCode || 500;
    let response = {
        code: statusCode,
        message: err.message || "Internal Server Error"
    };

    if (Array.isArray(err.errors)) {
        statusCode = 400;
        response = { code: 400, errors: err.errors };
    }

    if (err.code === "ECONNREFUSED") {
        statusCode = 500;
        response.message = "Database connection failed";
    }

    if (err.message && err.message.includes("not found")) {
        statusCode = 404;
        response.message = err.message;
    }
    
    if (statusCode === 500) {
        console.error("❌ Internal Server Error:", err.stack);
    }

    res.status(statusCode).json(response);
};
