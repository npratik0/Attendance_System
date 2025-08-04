// // const { Sequelize, DataTypes } = require('sequelize');
// // const dbConfig = require('../config/dbConfig');

// // const sequelize = new Sequelize(
// //   dbConfig.DB,
// //   dbConfig.USER,
// //   dbConfig.PASSWORD,
// //   {
// //     host: dbConfig.HOST,
// //     dialect: dbConfig.dialect,
// //     port: dbConfig.PORT,
// //   }
// // );

// // sequelize.authenticate()
// //   .then(() => console.log("Database connected"))
// //   .catch(err => console.error("Connection failed:", err));

// // const db = {};
// // db.Sequelize = Sequelize;
// // db.sequelize = sequelize;
// // db.User = require('./user')(sequelize, DataTypes);

// // module.exports = db;


// // const sequelize = require('../config/dbConfig');
// // const User = require('./user');
// // const Ticket = require('./Ticket');

// // sequelize.sync({ alter: true })  // or { force: true } for dev
// //   .then(() => console.log("Database synced"))
// //   .catch(err => console.error("Sync failed:", err));

// // module.exports = { User, Ticket };


// const Sequelize = require('sequelize');
// const sequelize = require('../config/dbConfig');

// const User = require('./user'); // Already working

// // ✅ Properly import and initialize Ticket model
// const TicketModel = require('./Ticket');
// const Ticket = TicketModel(sequelize, Sequelize.DataTypes);

// // Sync models with database
// sequelize.sync({ alter: true })
//   .then(() => console.log("Database synced"))
//   .catch(err => console.error("Sync failed:", err));

// // Export models
// module.exports = {
//   User,
//   Ticket
// };


const Sequelize = require('sequelize');
const sequelize = require('../config/dbConfig');

// Import models
const User = require('./user');

const TicketModel = require('./Ticket');
const Ticket = TicketModel(sequelize, Sequelize.DataTypes);

const Attendance = require('./Attendance');

// =================== ASSOCIATIONS ===================

// User has many Attendance records
User.hasMany(Attendance, {
  foreignKey: 'userId',
  as: 'attendanceRecords'
});

// Attendance belongs to User
Attendance.belongsTo(User, {
  foreignKey: 'userId',
  as: 'student'
});

// User has many Tickets (existing)
User.hasMany(Ticket, {
  foreignKey: 'userId',
  as: 'tickets'
});

// Ticket belongs to User (existing)
Ticket.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// =================== DATABASE SYNC ===================

// Sync models with database
sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced successfully");
    console.log("📊 Models: User, Ticket, Attendance");
  })
  .catch(err => {
    console.error("❌ Database sync failed:", err);
  });

// Export models
module.exports = {
  User,
  Ticket,
  Attendance,
  sequelize
};