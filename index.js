const express = require('express');
const cors = require('cors');
const path = require('path');
const patientRoutes = require('./routes/patientRoutes');
const errorHandler = require('./middlewares/errorHandlers');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html')); 
});
app.get('/managepatients', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Adjust path if needed
});
app.get('/manage', (req, res) => {
    res.sendFile(path.join(__dirname, 'adminpanel.html')); // Adjust path if needed
});

app.use('/patients', patientRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
