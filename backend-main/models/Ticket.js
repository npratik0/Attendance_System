// // models/Ticket.js
// module.exports = (sequelize, DataTypes) => {
//   const Ticket = sequelize.define('Ticket', {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     studentId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     fullName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     subject: {
//       type: DataTypes.STRING,
//     },
//     reason: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.STRING,
//       defaultValue: 'Pending',
//     },
//   });

//   return Ticket;
// };



module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    studentId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    }
  });

  return Ticket;
};
