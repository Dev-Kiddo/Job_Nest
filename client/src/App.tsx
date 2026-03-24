import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CandidateLogin from "./pages/CandidateLogin";
import CandidateRegister from "./pages/CandidateRegister";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterRegister from "./pages/RecruiterRegister";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import CheckEmail from "./components/CheckEmail";
import VerifyEmail from "./components/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";
import FlowGuard from "./components/FlowGuard";
import TokenGuard from "./components/TokenGuard";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />}>
            <Route index element={<Navigate to="candidate-register" replace />} />
            <Route index path="candidate-register" element={<CandidateRegister />} />
            <Route path="recruiter-register" element={<RecruiterRegister />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-Password" element={<ResetPassword />} />

          <Route path="/flow-guard" element={<FlowGuard />} />

          {/* Flow guard */}
          <Route element={<FlowGuard />}>
            <Route path="/check-email" element={<CheckEmail />} />
          </Route>

          {/* TokenGuard */}
          <Route element={<TokenGuard />}>
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<CandidateDashboard />} />
              <Route path="candidate-dashboard" element={<CandidateDashboard />} />
              <Route path="recruiter-dashboard" element={<RecruiterDashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
