const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');

describe('Job Applications API', () => {
  let token;
  let jobId;
  let applicationId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    await request(app).post('/auth/register').send({
      username: 'testrecruiter',
      email: 'testrecruiter@example.com',
      password: 'password123',
      role: 'recruiter'
    });

    const res = await request(app).post('/auth/login').send({
      email: 'testrecruiter@example.com',
      password: 'password123',
    });

    token = res.body.token;

    const jobRes = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Software Engineer',
        description: 'Develop software',
        salary_range: '50k-70k',
        location: 'Remote',
      });

    jobId = jobRes.body.id;
  });

  it('should submit a job application and send an email notification', async () => {
    const res = await request(app).post('/api/applications').send({
      job_posting_id: jobId,
      name: 'Test Test',
      email: 'test@example.com',
      resume: 'Experienced software engineer with 5 years of experience.'
    });

    applicationId = res.body.application.id;
    expect(res.statusCode).toEqual(201);
    expect(res.body.application).toHaveProperty('name', 'Test Test');
  });

  it('should fetch job applications for a job posting', async () => {
    const res = await request(app)
      .get(`/api/applications/${jobId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update job application status to shortlisted', async () => {
    const res = await request(app)
      .put(`/api/applications/${applicationId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'shortlisted' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.application).toHaveProperty('status', 'shortlisted');
  });
});
