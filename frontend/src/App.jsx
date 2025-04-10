import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NgoRegistration from "./components/NgoRegistration";
import AdminDashboard from "./components/AdminDashboard";
import ResortRegistration from "./components/ResortRegistration";
import Home from "./components/Home";
import Resort from "./components/Resort";
import Ngo from "./components/Ngo";
import NgoLogin from "./components/NgoLogin";
import ResortLogin from "./components/ResortLogin";
import Guideline from "./components/Guideline";
import ActiveRequests from "./components/ActiveRequests";
import ResortCard from "./components/ResortCard";
function App() {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resort/register" element={<ResortRegistration />} />
          <Route path="/ngo/register" element={<NgoRegistration />} />
          <Route path="/resort" element={<Resort />} />
          <Route path="/ngo" element={<Ngo />} />
          <Route path="/resort/login" element={<ResortLogin />} />
          <Route path="/ngo/login" element={<NgoLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/guideline" element={<Guideline />} />
          <Route path="/active-requests" element={<ActiveRequests />} /> 
          <Route path="/resort-card" element={<ResortCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;