import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/SIgnup'; // ✅ Double check casing
import ProfilePage from './pages/ProfilePage';
import TeachersDashboard from './pages/TeachersDashboard'; // ✅ Teacher dashboard
import StudentDashboard from './pages/StudentDashboard'; // ✅ NEW: Student dashboard
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'; // ✅ Import your new file
import ProtectedRoute from './pages/ProtectedRoutes';
import ChangePassword from './pages/ChangePassword';



// function App() {
//   const [currentPage, setCurrentPage] = useState('student-dashboard'); // ✅ default is teacher dashboard

//   const handlePageSwitch = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="App">
//       {/* ✅ Conditionally show Navbar only if not on dashboard pages */}
//       {currentPage !== 'dashboard' && currentPage !== 'student-dashboard' && (
//         <Navbar currentPage={currentPage} onPageSwitch={handlePageSwitch} />
//       )}

//       <main>
//         {currentPage === 'landing' && (
//           <LandingPage
//             onSwitchToLogin={() => handlePageSwitch('login')}
//             onSwitchToSignup={() => handlePageSwitch('signup')}
//           />
//         )}
//         {currentPage === 'login' && (
//           <Login onSwitchToSignup={() => handlePageSwitch('signup')} />
//         )}
//         {currentPage === 'signup' && (
//           <Signup onSwitchToLogin={() => handlePageSwitch('login')} />
//         )}
//         {currentPage === 'profile' && (
//           <ProfilePage onBack={() => handlePageSwitch('dashboard')} />
//         )}
//         {currentPage === 'dashboard' && (
//           <TeachersDashboard onNavigate={handlePageSwitch} />
//         )}
//         {currentPage === 'student-dashboard' && (
//           <StudentDashboard onNavigate={handlePageSwitch} />
//         )}
//       </main>
//     </div>
//   );
// }


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<AdminDashboard />} /> ✅ Start page changed
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* ✅ Added route */}
        <Route path="/profile/change-password" element={<ChangePassword />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/teacher-dashboard" element={<TeachersDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />

        </Route>

      </Routes>
    </Router>
  )
}

export default App;