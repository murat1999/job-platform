const db = require('../models/index');
const { User, JobApplication, JobPosting } = db;

const sendEmailNotification = (recruiterEmail, jobTitle, applicantName) => {
    console.log(`Notification: New application received for "${jobTitle}" from "${applicantName}". Email sent to: ${recruiterEmail}`);
  };

const submitApplication = async (req, res) => {
  try {
    const { job_posting_id, name, email, resume } = req.body;

    const job = await JobPosting.findByPk(job_posting_id, {
        include: {
            model: User,
            as: 'recruiter',
            attributes: ['email']
          }
    });
    if (!job) return res.status(404).json({ message: 'Job posting not found' });

    const application = await JobApplication.create({
      job_posting_id,
      name,
      email,
      resume,
    });

    sendEmailNotification(job.recruiter.email, job.title, name);

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting job application', error: error.message || error });
  }
};

const viewApplications = async (req, res) => {
  try {
    const recruiter_id = req.user.userId;
    const jobId = req.params.id;

    const job = await JobPosting.findOne({
        where: { id: jobId, recruiter_id, },
    });
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });

    const applications = await JobApplication.findAll({
        where: { job_posting_id: jobId },
        order: [['createdAt', 'DESC']],
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job applications', error: error.message || error });
  }
};

const manageApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    const application = await JobApplication.findByPk(applicationId);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    await application.update({ status });
    res.json({ message: 'Application status updated successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error: error.message || error });
  }
};

module.exports = { submitApplication, viewApplications, manageApplication, sendEmailNotification };
