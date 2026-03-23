import { Eye, EyeOff, Lock, Mail, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, removeMessage } from "../features/userSlice";
import { toast } from "react-toastify";

function Login() {
  const { message } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const onChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const onSubmitHandler = async function (e) {
    e.preventDefault();
    dispatch(loginUser(payload));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate("/dashboard");
      dispatch(removeMessage());
    }
  }, [message, dispatch]);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto border border-gray-300 rounded-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700 mb-1">Login</h1>
          <p className="text-sm text-gray-600">
            Dont have an account?
            <Link className="text-blue-500 underline font-medium" to="/register/candidate-register">
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
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                  type="email"
                  value={payload.email}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="border border-gray-300 rounded flex items-center p-2.5">
                <Lock className="mr-2" />
                <input
                  id="password"
                  placeholder="Password"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                  type={showPassword ? "text" : "password"}
                  value={payload.password}
                  onChange={onChangeHandler}
                />

                {showPassword ? <EyeOff onClick={() => setShowPassword((pass) => !pass)} /> : <Eye onClick={() => setShowPassword((pass) => !pass)} />}
              </div>
            </div>

            <label className="flex items-center gap-1 cursor-pointer text-sm text-gray-600">
              <input id="terms-checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" type="checkbox" />
              Remember me
            </label>
            <button type="submit" className="w-full bg-blue-600 text-white py-4 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
              Sign in <MoveRight color="#fff" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
