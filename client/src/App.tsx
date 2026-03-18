import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginCandidate from "./pages/LoginCandidate";
import RegisterCandidate from "./pages/RegisterCandidate";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import LoginRecruiter from "./pages/LoginRecruiter";
import RegisterRecruiter from "./pages/RegisterRecruiter";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/candidate-register" element={<RegisterCandidate />} />
          <Route path="/candidate-login" element={<LoginCandidate />} />
          <Route path="/recruiter-login" element={<LoginRecruiter />} />
          <Route path="/recruiter-register" element={<RegisterRecruiter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
