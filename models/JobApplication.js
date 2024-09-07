const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JobApplication extends Model {}

  JobApplication.init({
    job_posting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_postings',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'applied',
    },
  }, {
    sequelize,
    modelName: 'JobApplication',
    tableName: 'job_applications',
  });

  return JobApplication;
};
