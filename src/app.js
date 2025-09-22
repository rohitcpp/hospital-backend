const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorroutes'); // added

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// health check
app.get('/', (req, res) => res.json({ ok: true }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api', doctorRoutes); // added

// global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

module.exports = app;
