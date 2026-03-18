import { Lock, LogIn, LucideUpload, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

const RegisterRecruiter = function () {
  return (
    <div className="w-full max-w-md mx-auto border border-gray-200 rounded-lg p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-1">Recruiter Signup</h1>
        <p className="text-sm text-gray-600">Welcome! Please sign up to continue</p>
      </div>

      <form className="space-y-4">
        <div className="flex flex-col items-center mb-4">
          <label className="relative cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-orange-300 hover:border-blue-500 transition-colors">
              <LucideUpload />
            </div>
            <input className="hidden" accept="image/*" type="file" />
            <span className="block text-xs text-center mt-2 text-gray-500">Upload your photo</span>
          </label>
        </div>
        <div className="space-y-3">
          <div className="border border-gray-300 rounded flex items-center p-2.5">
            <User className="mr-2" />
            <input placeholder="Full name" className="w-full outline-none text-sm bg-transparent placeholder-gray-400" type="text" />
          </div>
          <div className="border border-gray-300 rounded flex items-center p-2.5">
            <Mail className="mr-2" />
            <input placeholder="Email address" className="w-full outline-none text-sm bg-transparent placeholder-gray-400" type="email" />
          </div>
          <div className="border border-gray-300 rounded flex items-center p-2.5">
            <Lock className="mr-2" />
            <input placeholder="Password" className="w-full outline-none text-sm bg-transparent placeholder-gray-400" type="password" />
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center cursor-pointer ">
          Create Account
        </button>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center cursor-pointer">
          <LogIn color="white" className="mr-2" />
          Sign up with Google
        </button>
        <div className="text-center text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:text-blue-800 font-medium hover:underline" to="/recruiter-login" data-discover="true">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterRecruiter;
