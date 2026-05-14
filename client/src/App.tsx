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
import CandidatePersonalInfo from "./components/CandidatePersonalInfo";
import ChooseCompany from "./pages/ChooseCompany";
import CreateCompany from "./pages/CreateCompany";
import CompanyInfo from "./components/CompanyInfo";
import FoundingInfo from "./components/FoundingInfo";
import CompanySocialMediaLinks from "./pages/CompanySocialMediaLinks";
import CandidateOverview from "./components/CandidateOverview";
import CandidateProfileInfo from "./components/CandidateProfileInfo";
import CandidateSocialInfo from "./components/CandidateSocialInfo";
import CompanyOverview from "./components/CompanyOverview";
import CompanySettings from "./pages/CompanySettings";
import ManageCompanyInfo from "./components/ManageCompanyInfo";
import ManageFoundingInfo from "./components/ManageFoundingInfo";
import ManageSocialInfo from "./components/ManageSocialInfo";
import Jobs from "./pages/Jobs";
import JobPreview from "./pages/JobPreview";
import AppliedJobs from "./components/AppliedJobs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/job-preview" element={<JobPreview />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<CandidateSettings />} />

          <Route path="/setup-company" element={<ChooseCompany />} />

          <Route path="/create-company" element={<CreateCompany />}>
            <Route index element={<CompanyInfo />} />
            <Route path="company-info" element={<CompanyInfo />} />
            <Route path="founding-info" element={<FoundingInfo />} />
            <Route path="social-links" element={<CompanySocialMediaLinks />} />
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

              <Route path="candidate" element={<CandidateDashboard />}>
                <Route index element={<CandidateOverview />} />
                <Route path="overview" element={<CandidateOverview />} />
                <Route path="applied-jobs" element={<AppliedJobs />} />

                <Route path="settings" element={<CandidateSettings />}>
                  <Route index element={<CandidatePersonalInfo />} />
                  <Route path="personal-info" element={<CandidatePersonalInfo />} />
                  <Route path="profile-info" element={<CandidateProfileInfo />} />
                  <Route path="social-info" element={<CandidateSocialInfo />} />
                </Route>
              </Route>

              <Route path="recruiter" element={<RecruiterDashboard />}>
                <Route index element={<CompanyOverview />} />
                <Route path="overview" element={<CompanyOverview />} />

                <Route path="settings" element={<CompanySettings />}>
                  <Route index element={<ManageCompanyInfo />} />
                  <Route path="manage-company-info" element={<ManageCompanyInfo />} />
                  <Route path="manage-founding-info" element={<ManageFoundingInfo />} />
                  <Route path="manage-social-info" element={<ManageSocialInfo />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
