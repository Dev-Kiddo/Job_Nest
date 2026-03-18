import { Lock, LogIn, Mail } from "lucide-react";
import { Link } from "react-router-dom";
// import Loader from "../components/Loader";
import { useEffect } from "react";

const LoginCandidate = function () {
  useEffect(() => {}, []);
  return (
    <div className="w-full max-w-md mx-auto border border-gray-200 rounded-lg p-6 bg-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-1">Candidate Login</h1>
        <p className="text-sm text-gray-600">Welcome back! Please login to continue</p>
      </div>

      <form className="space-y-4">
        <div className="border border-gray-300 rounded flex items-center p-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <Mail className="mr-2" />
          <input id="email" placeholder="Email id" className="w-full outline-none text-sm" type="email" />
        </div>
        <div className="border border-gray-300 rounded flex items-center p-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <Lock className="mr-2" />
          <input id="password" placeholder="Password" className="w-full outline-none text-sm" type="password" />
        </div>

        {/* <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" type="checkbox" />

            <span className="text-sm text-gray-600">Remember me</span>
          </label>
        </div> */}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center cursor-pointer ">
          Login
        </button>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center cursor-pointer">
          <LogIn color="white" className="mr-2" />
          Sign up with Google
        </button>
        <div className="text-center text-sm text-gray-600 mt-2">
          Don't have an account?{" "}
          <Link className="text-blue-600 hover:text-blue-800 font-medium hover:underline" to="/candidate-register">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginCandidate;
