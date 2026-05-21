import { Eye, EyeOff, Lock, Mail, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../features/userSlice";
import useToastMessage from "../hooks/useToastMessage";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

function Login() {
  const { loading, message, messageType } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const allowAccess = useRef(false);

  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const onChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const onSubmitHandler = function (e) {
    e.preventDefault();

    if (!loading) {
      dispatch(loginUser(payload));
      allowAccess.current = true;
    }
  };

  useEffect(() => {
    if (message && messageType === "success" && allowAccess.current) {
      navigate("/dashboard", { state: { from: location?.state?.from } });
    }
  }, [message, messageType, navigate, location?.state?.from]);

  useToastMessage("user");
  return (
    <>
      <motion.div
        className="w-full max-w-2xl mx-auto border border-gray-300 rounded-lg p-6 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700 mb-1">Sign in</h1>
          <p className="text-xs text-gray-600 lg:text-sm">
            Dont have an account?{" "}
            <Link className="text-blue-600 underline font-medium" to="/register/candidate-register">
              Create Account
            </Link>
          </p>
        </div>

        <div className="w-full mx-auto rounded-lg">
          <form className="space-y-4" onSubmit={onSubmitHandler}>
            <div className="space-y-3">
              <div className="border border-gray-300 rounded flex items-center p-2.5">
                <Mail className="mr-2" />
                <input
                  id="email"
                  placeholder="Email address"
                  className="w-full outline-none bg-transparent placeholder-gray-400 text-xs lg:text-sm"
                  type="email"
                  value={payload.email}
                  onChange={onChangeHandler}
                  autoComplete="off"
                />
              </div>
              <div className="border border-gray-300 rounded flex items-center p-2.5">
                <Lock className="mr-2" />
                <input
                  id="password"
                  placeholder="Password"
                  className="w-full outline-none bg-transparent placeholder-gray-400 text-xs lg:text-sm"
                  type={showPassword ? "text" : "password"}
                  value={payload.password}
                  onChange={onChangeHandler}
                  autoComplete="off"
                />

                {showPassword ? <EyeOff onClick={() => setShowPassword((pass) => !pass)} /> : <Eye onClick={() => setShowPassword((pass) => !pass)} />}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-1 cursor-pointer text-xs text-gray-600 lg:text-sm">
                <input id="terms-checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" type="checkbox" />
                Remember me
              </label>

              <Link className="text-xs font-medium text-blue-600 underline lg:text-sm" to="/forgot-password">
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer text-xs lg:text-sm"
            >
              Sign in {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default Login;
