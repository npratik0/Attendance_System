// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/v1/auth/me', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(res.data.data);
//       } catch (err) {
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Welcome, {user.name}!</h2>
//       <p>Email: {user.email}</p>
//       <p>Role: {user.role}</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Dashboard;