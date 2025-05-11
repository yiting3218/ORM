const { sequelize } = require('../orm');
const Student = require('./Student');
const Course = require('./Course');
const Department = require('./Department');
const Enrollment = require('./Enrollment');

// 設定一對多：Department -> Student
Department.hasMany(Student, { foreignKey: 'Department_ID' });
Student.belongsTo(Department, { foreignKey: 'Department_ID' });

// 設定一對多：Department -> Course
Department.hasMany(Course, { foreignKey: 'Department_ID' });
Course.belongsTo(Department, { foreignKey: 'Department_ID' });

// 設定多對多：Student <-> Course via Enrollment
Student.belongsToMany(Course, {
  through: Enrollment,
  foreignKey: 'Student_ID',
  otherKey: 'Course_ID'
});

Course.belongsToMany(Student, {
  through: Enrollment,
  foreignKey: 'Course_ID',
  otherKey: 'Student_ID'
});

// Enrollment 要能 include Course 與 Student
Enrollment.belongsTo(Student, { foreignKey: 'Student_ID' });
Enrollment.belongsTo(Course, { foreignKey: 'Course_ID' });

module.exports = {
  sequelize,
  Student,
  Course,
  Department,
  Enrollment
};
