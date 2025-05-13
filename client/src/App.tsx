import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientList from "./pages/PatientList";
import PatientDetailsPage from './pages/PatientDetailsPage';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PatientList />} />
      <Route path="/patients" element={<PatientList />} />
      <Route path="/patients/:id" element={<PatientDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App; 