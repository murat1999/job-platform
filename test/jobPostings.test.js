const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');

describe('Job Postings API', () => {
  let token;
  let jobId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    await request(app).post('/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'recruiter'
    });

    const res = await request(app).post('/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });

    token = res.body.token;
  });

  it('should create a new job posting', async () => {
    const res = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Software Engineer',
        description: 'Develop software',
        salary_range: '50k-70k',
        location: 'Remote',
      });

    jobId = res.body.id;
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Software Engineer');
  });

  it('should fetch job postings', async () => {
    const res = await request(app)
      .get('/api/jobs')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.jobs.length).toBeGreaterThan(0);
  });

  it('should update a job posting', async () => {
    const res = await request(app)
      .put(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Senior Software Engineer',
        description: 'Develop best software',
        salary_range: '70k-100k',
        location: 'Remote',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.job).toHaveProperty('title', 'Senior Software Engineer');
  });

  it('should delete a job posting', async () => {
    const res = await request(app)
      .delete(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Job deleted successfully');
  });
});
