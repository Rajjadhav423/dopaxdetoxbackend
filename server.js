const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user-routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
