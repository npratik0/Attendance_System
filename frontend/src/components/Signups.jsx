// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // function Signup() {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     role: 'student' // default role
// //   });
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post('http://localhost:5000/api/v1/auth/register', formData);
// //       console.log(res.data);
// //       alert('Registration successful!');
// //       navigate('/login');
// //     } catch (err) {
// //       alert(err.response?.data?.message || 'Registration failed');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Sign Up</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Name"
// //           value={formData.name}
// //           onChange={(e) => setFormData({...formData, name: e.target.value})}
// //           required
// //         /><br/>
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={formData.email}
// //           onChange={(e) => setFormData({...formData, email: e.target.value})}
// //           required
// //         /><br/>
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={formData.password}
// //           onChange={(e) => setFormData({...formData, password: e.target.value})}
// //           required
// //         /><br/>
// //         <select
// //           value={formData.role}
// //           onChange={(e) => setFormData({...formData, role: e.target.value})}
// //         >
// //           <option value="student">Student</option>
// //           <option value="teacher">Teacher</option>
// //         </select><br/>
// //         <button type="submit">Sign Up</button>
// //       </form>
// //       <p>Already have an account? <a href="/login">Login</a></p>
// //     </div>
// //   );
// // }

// // export default Signup;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'student' // default role
//   });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/v1/auth/register', formData);
//       console.log(res.data);
//       alert('Registration successful!');
//       navigate('/login');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <select
//             value={formData.role}
//             onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="student">Student</option>
//             <option value="teacher">Teacher</option>
//           </select>
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;
