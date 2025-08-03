// const express = require('express');
// const dotenv = require('dotenv');
// const db = require('./models');
// const authRoutes = require('./routes/authRoutes');

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;

// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });



// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const authRoutes = require('./routes/authRoutes');
// require('./models'); // for sync

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes'); // Add this line
// require('./models'); // for sync

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes); // Add this line

// const ticketRoutes = require('./routes/ticketRoutes');
// app.use('/api/tickets', ticketRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('./models'); // for sync

app.use(cors());
app.use(express.json());

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files served from: ${path.join(__dirname, 'uploads')}`);
});