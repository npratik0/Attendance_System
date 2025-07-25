import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/SIgnup'; // ✅ Double check casing
import ProfilePage from './pages/ProfilePage';
import TeachersDashboard from './pages/TeachersDashboard'; // ✅ Teacher dashboard
import StudentDashboard from './pages/StudentDashboard'; // ✅ NEW: Student dashboard

function App() {
  const [currentPage, setCurrentPage] = useState('student-dashboard'); // ✅ default is teacher dashboard

  const handlePageSwitch = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {/* ✅ Conditionally show Navbar only if not on dashboard pages */}
      {currentPage !== 'dashboard' && currentPage !== 'student-dashboard' && (
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
        {currentPage === 'student-dashboard' && (
          <StudentDashboard onNavigate={handlePageSwitch} />
        )}
      </main>
    </div>
  );
}

export default App;
