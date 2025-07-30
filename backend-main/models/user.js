// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('Attendence_User', {
//     full_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     contact: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     role: {
//       type: DataTypes.ENUM('teacher', 'student'),
//       allowNull: false,
//     }
//   });

//   return User;
// };


const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User_test1', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('student', 'teacher'),
    allowNull: false
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  employeeId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = User;
