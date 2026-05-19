import { Building2, CircleUser } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <motion.div
        className="w-full max-w-2xl mx-auto border border-gray-300 rounded-lg p-6 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700 mb-1">Create account</h1>
          <p className="text-sm text-gray-600">
            Already have a account?{" "}
            <Link className="text-blue-600  underline font-medium" to="/login">
              Login
            </Link>
          </p>

          <div className="w-full bg-gray-200 p-6 rounded-lg mx-auto mt-6">
            <p className="text-xs text-center text-gray-500 uppercase">Create account as a</p>

            <div className="flex items-center justify-between mt-4">
              <NavLink
                className="flex-grow text-sm px-10 py-2 text-gray-500 underline  rounded-lg [&.active]:bg-blue-600 [&.active]:no-underline [&.active]:text-white"
                to="candidate-register"
              >
                <span className="flex gap-2 items-center justify-center text-xs">
                  <CircleUser color="#ea580c" />
                  Candidate
                </span>
              </NavLink>

              <NavLink
                className="flex-grow text-sm px-10 py-2 text-gray-500 underline  rounded-lg [&.active]:bg-blue-600 [&.active]:no-underline [&.active]:text-white"
                to="recruiter-register"
              >
                <span className="flex gap-2 items-center justify-center text-xs">
                  <Building2 color="#ea580c" />
                  Recruiter
                </span>
              </NavLink>
            </div>
          </div>
        </div>

        <Outlet context={{ showPassword, setShowPassword }} />
      </motion.div>
    </>
  );
}

export default Register;
