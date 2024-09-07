const { Op } = require('sequelize');
const db = require('../models/index');
const { JobPosting } = db;

const createJob = async (req, res) => {
  try {
    const { title, description, salary_range, location } = req.body;
    const recruiter_id = req.user.userId;

    const newJob = await JobPosting.create({
      title,
      description,
      salary_range,
      location,
      recruiter_id,
    });

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job posting', error: error.message || error });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { title, description, salary_range, location } = req.body;
    const recruiter_id = req.user.userId;

    const job = await JobPosting.findOne({ where: { id: jobId, recruiter_id } });
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });

    await job.update({ title, description, salary_range, location });
    res.json({ message: 'Job updated successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error updating job posting', error: error.message || error });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const recruiter_id = req.user.userId;

    const job = await JobPosting.findOne({ where: { id: jobId, recruiter_id } });
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });

    await job.destroy();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job posting', error: error.message || error });
  }
};

const fetchJobs = async (req, res) => {
  try {
    const { title, location, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (title) whereClause.title = { [Op.iLike]: `%${title}%` };
    if (location) whereClause.location = { [Op.iLike]: `%${location}%` };

    const jobs = await JobPosting.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({ total: jobs.count, jobs: jobs.rows });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job postings', error: error.message || error });
  }
};

module.exports = { createJob, updateJob, deleteJob, fetchJobs };
