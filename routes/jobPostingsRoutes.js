const express = require('express');
const { createJob, updateJob, deleteJob, fetchJobs } = require('../controllers/jobPostingsController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/jobs', authenticateUser, createJob);
router.put('/jobs/:id', authenticateUser, updateJob);
router.delete('/jobs/:id', authenticateUser, deleteJob);
router.get('/jobs', fetchJobs);

module.exports = router;
