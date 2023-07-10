import { useEffect } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import LabTestReport from './components/reports/SmartReport';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.loggedInUserData?._id);

  console.log(user)
  useEffect(() => {
    // Check if the user is not on the login or register page
    if (
      (location.pathname !== "/login" && location.pathname !== "/register") &&
      (!user || Object.keys(user).length === 0) // Check if the user is not logged in
    ) {
      navigate("/login"); // Navigate to /login if the user is not logged in
    }
  }, [user, navigate, location]);

  return (
    <div className="App">
      <Routes>
        {!user || Object.keys(user).length === 0 ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
          <Route path="/report" element={<LabTestReport />} />
          <Route path="/" element={<Homepage userData={user} />}/>
        </>
        )}
      </Routes>
    </div>
  );
}

export default App;
