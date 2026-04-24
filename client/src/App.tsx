import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CandidateRegister from "./pages/CandidateRegister";
import Home from "./pages/Home";
import Layout from "./components/Layout";
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
import CandidateSettings from "./pages/CandidateSettings";
import CandidateBasicInfo from "./components/CandidateBasicInfo";
import ChooseCompany from "./pages/ChooseCompany";
import CreateCompany from "./pages/CreateCompany";
import CompanyInfo from "./components/CompanyInfo";
import FoundingInfo from "./components/FoundingInfo";
import CompanySocialMediaLinks from "./pages/CompanySocialMediaLinks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<CandidateSettings />} />

          <Route path="/setup-company" element={<ChooseCompany />} />

          <Route path="/social-links" element={<CompanySocialMediaLinks />} />

          <Route path="/create-company" element={<CreateCompany />}>
            <Route index element={<CompanyInfo />} />
            <Route path="company-info" element={<CompanyInfo />} />
            <Route path="founding-info" element={<FoundingInfo />} />
            <Route index element={<CompanyInfo />} />
            <Route index element={<CompanyInfo />} />
          </Route>

          <Route path="/register" element={<Register />}>
            <Route index element={<Navigate to="candidate-register" replace />} />
            <Route index path="candidate-register" element={<CandidateRegister />} />
            <Route path="recruiter-register" element={<RecruiterRegister />} />
          </Route>

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
              <Route path="candidate" element={<CandidateDashboard />} />
              <Route path="recruiter" element={<RecruiterDashboard />} />
              <Route path="candidate/settings" element={<CandidateSettings />}>
                <Route index element={<CandidateBasicInfo />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
