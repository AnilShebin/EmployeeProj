const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors');
const sendEmail = require('./contactUs');
const { authenticateToken } = require('./middleware/authMiddleware');
const { handleErrors } = require('./middleware/errorMiddleware');

// Import route controllers
const authRoutes = require('./controllers/authController');
const employeeRoutes = require('./controllers/employeeController');
const rolesRoutes = require('./controllers/roleController');
const holidayRoutes = require('./controllers/holidayController');
const timeRoutes = require('./controllers/timeController');
const payslipRoutes = require('./controllers/payslipController');
const passwordRoutes = require('./controllers/passwordController'); // Import password-related routes

// Middleware
app.use(cors({
  origin: 'https://thaytech.vercel.app', // Allow requests from your frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization', // Add other headers as needed
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());

// Use authentication middleware for routes under '/api/auth'
app.use('/api/auth', authRoutes);

// Use authentication middleware for protected routes
app.use('/api/employee', authenticateToken, employeeRoutes);
app.use('/api/roles', authenticateToken, rolesRoutes);
app.use('/api/holiday', authenticateToken, holidayRoutes);
app.use('/api/time', authenticateToken, timeRoutes);
app.use('/api/payslip', authenticateToken, payslipRoutes);

// Use password routes
app.use('/api/password', authenticateToken, passwordRoutes);

// Handle Errors middleware should be placed last
app.use(handleErrors);

app.get('/email', (req, res) => {
  sendEmail(req.query)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

// Server start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
