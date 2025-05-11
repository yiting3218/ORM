const { sequelize, DataTypes } = require('../orm');

const Student = sequelize.define('Student', {
  Student_ID: {
    type: DataTypes.STRING(9),
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Gender: {
    type: DataTypes.CHAR(1)
  },
  Email: {
    type: DataTypes.STRING(100)
  },
  Department_ID: {
    type: DataTypes.STRING(5)
  }
}, {
  tableName: 'STUDENT',      // 對應資料庫中的表格名稱
  timestamps: false          // 不自動加入 createdAt / updatedAt
});

module.exports = Student;
