import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CandidateLogin from "./pages/CandidateLogin";
import CandidateRegister from "./pages/CandidateRegister";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterRegister from "./pages/RecruiterRegister";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/register" element={<Register />}>
            <Route index element={<Navigate to="candidate-register" replace />} />
            <Route index path="candidate-register" element={<CandidateRegister />} />
            <Route path="recruiter-register" element={<RecruiterRegister />} />
          </Route>

          <Route path="/candidate-login" element={<CandidateLogin />} />
          <Route path="/recruiter-login" element={<RecruiterLogin />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
