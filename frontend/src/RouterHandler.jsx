// RouterHandler.jsx
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import Home from "./Pages/Form";
import Holdings from "./Pages/Holdings";
import Pavti from './Pages/Pavti';
import Receipt from './Pages/Receipt';
import PavtiForm from './Pages/PavtiForm';
import SecretToken from './Pages/SecretToken';
import Form from './Pages/Form';
import ProtectedRoute from './ProtectedRoute';

function RouterHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loginTime = Number(localStorage.getItem("loginTime"));
    const authToken = localStorage.getItem("authToken");
    const TWO_HOURS = 2*60 * 60 * 1000;

    if (!authToken || Date.now() - loginTime >= TWO_HOURS) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("loginTime");
      
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
      return;
    }

    const remaining = TWO_HOURS - (Date.now() - loginTime);
    const timer = setTimeout(() => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("loginTime");
        localStorage.setItem("sessionExpired", "true"); 
      navigate("/", { replace: true });
    }, remaining);

    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  return (
    <Routes>
      
      <Route path="/" element={<SecretToken />} />

      <Route path="/form" element={ <Form />} />
      <Route path="/holdings" element={<Holdings />} />
      <Route path="/pavti/:idCode" element={<Pavti />} />
      <Route path="/pavti" element={<ProtectedRoute><PavtiForm /></ProtectedRoute>} />
      <Route path="/receipt/:uniquckId" element={<ProtectedRoute><Receipt /></ProtectedRoute>} />
    </Routes>
  );
}

export default RouterHandler;
