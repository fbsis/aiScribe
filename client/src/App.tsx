import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientList from "./pages/PatientList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientList />} />
      </Routes>
    </Router>
  );
}

export default App; 