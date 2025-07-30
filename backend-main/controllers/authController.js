// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../models');
// const User = db.User;

// exports.signup = async (req, res) => {
//   const { full_name, contact, email, password, confirmPassword, role } = req.body;

//   if (!full_name || !contact || !email || !password || !confirmPassword || !role)
//     return res.status(400).json({ message: "All fields are required" });

//   if (password !== confirmPassword)
//     return res.status(400).json({ message: "Passwords do not match" });

//   try {
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser)
//       return res.status(409).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       full_name,
//       contact,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     res.status(201).json({ message: "User registered successfully", user: newUser });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password, role } = req.body;

//   if (!email || !password || !role)
//     return res.status(400).json({ message: "All fields are required" });

//   try {
//     const user = await User.findOne({ where: { email, role } });
//     if (!user)
//       return res.status(404).json({ message: "User not found with given role" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         full_name: user.full_name,
//         email: user.email,
//         contact: user.contact,
//         role: user.role
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id, {
//       attributes: ['id', 'full_name', 'email', 'contact', 'role']
//     });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ user });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };




const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const {
      fullName, email, phone, password, confirmPassword, role,
      studentId, employeeId, department, semester
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      studentId: role === 'student' ? studentId : null,
      employeeId: role === 'teacher' ? employeeId : null,
      department,
      semester: role === 'student' ? semester : null
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { studentId, password, role } = req.body;

    const user = await User.findOne({ where: { studentId, role } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    // const token = jwt.sign(
    //   { id: user.id, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1d' }
    // );
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    

    res.status(200).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};
