const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);

sequelize.sync().then(() => console.log('Database synced'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
