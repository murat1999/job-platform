const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JobPosting extends Model {
    static associate(models) {
      JobPosting.belongsTo(models.User, {
        foreignKey: 'recruiter_id',
        as: 'recruiter',
      });
    }
  }

  JobPosting.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    salary_range: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recruiter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'JobPosting',
    tableName: 'job_postings',
  });

  return JobPosting;
};
