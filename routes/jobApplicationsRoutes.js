const express = require('express');
const { submitApplication, viewApplications, manageApplication } = require('../controllers/jobApplicationsController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/applications', submitApplication);
router.get('/applications/:id', authenticateUser, viewApplications);
router.put('/applications/:id', authenticateUser, manageApplication);

module.exports = router;
