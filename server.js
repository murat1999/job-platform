const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const jobPostingsRoutes = require('./routes/jobPostingsRoutes');
const jobApplicationsRoutes = require('./routes/jobApplicationsRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', jobPostingsRoutes);
app.use('/api', jobApplicationsRoutes);

app.get('/', (req, res) => {
  res.send('This is Job Application Platform. Looking forward to working with you!');
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

module.exports = app;
