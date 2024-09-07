module.exports = {
  development: {
    username: 'postgres',
    password: 'example',
    database: 'job_platform',
    host: 'db',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'example',
    database: 'job_platform_test',
    host: 'db_test',
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: 'example',
    database: 'job_platform_prod',
    host: 'db',
    dialect: 'postgres'
  }
};
