// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Navbar from './components/Navbar';
// import Login from './pages/Login';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />}
//         <Route path ="/navbar" element={<Navbar />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
// import React, { useState } from 'react';
// import Navbar from './components/Navbar';
// import LandingPage from './pages/LandingPage';
// import Login from './pages/Login';
// import Signup from './pages/SIgnup'; // double check spelling

// function App() {
//   const [currentPage, setCurrentPage] = useState('landing'); // default is landing page

//   const handlePageSwitch = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="App">
//       {/* Always show Navbar */}
//       <Navbar currentPage={currentPage} onPageSwitch={handlePageSwitch} />

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
//       </main>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/SIgnup'; // Double check the file name casing
import ProfilePage from './pages/ProfilePage';
import TeachersDashboard from './pages/TeachersDashboard'; // ✅ NEW IMPORT

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard'); // ✅ default is teacher dashboard

  const handlePageSwitch = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {/* ✅ Conditionally show Navbar only if not on TeachersDashboard */}
      {currentPage !== 'dashboard' && (
        <Navbar currentPage={currentPage} onPageSwitch={handlePageSwitch} />
      )}

      <main>
        {currentPage === 'landing' && (
          <LandingPage
            onSwitchToLogin={() => handlePageSwitch('login')}
            onSwitchToSignup={() => handlePageSwitch('signup')}
          />
        )}
        {currentPage === 'login' && (
          <Login onSwitchToSignup={() => handlePageSwitch('signup')} />
        )}
        {currentPage === 'signup' && (
          <Signup onSwitchToLogin={() => handlePageSwitch('login')} />
        )}
        {currentPage === 'profile' && (
          <ProfilePage onBack={() => handlePageSwitch('dashboard')} />
        )}
        {currentPage === 'dashboard' && (
          <TeachersDashboard onNavigate={handlePageSwitch} />
        )}
      </main>
    </div>
  );
}

export default App;
