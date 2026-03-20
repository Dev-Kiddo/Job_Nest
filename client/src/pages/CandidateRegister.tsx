import { Eye, EyeOff, Lock, Mail, MoveRight, User, UserKey } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, removeError, removeMessage } from "../features/userSlice";

interface ICandidatePayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "seeker";
}

const CandidateRegister = function () {
  const [payload, setPayload] = useState<ICandidatePayload>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "seeker",
  });

  const { showPassword, setShowPassword } = useOutletContext();

  const dispatch = useDispatch();
  const { currentUser, loading, message, error } = useSelector((state) => state.user);

  const onChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const onSubmitHandler = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!payload.name || !payload.email || !payload.password || !payload.confirmPassword) {
      toast.error("All the fields required");
      return;
    }

    if (!loading) {
      dispatch(registerUser(payload));
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(removeMessage());
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeError());
    }
  }, [error, dispatch]);

  return (
    <div className="w-full mx-auto rounded-lg">
      <form className="space-y-4" onSubmit={onSubmitHandler}>
        <div className="space-y-3">
          <div className="border border-gray-300 rounded flex items-center p-2.5">
            <User className="mr-2" />
            <input
              id="name"
              placeholder="Name"
              className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
              type="text"
              value={payload.name}
              onChange={onChangeHandler}
            />
          </div>
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

            {showPassword ? <EyeOff onClick={() => setShowPassword((pass: boolean) => !pass)} /> : <Eye onClick={() => setShowPassword((pass: boolean) => !pass)} />}
          </div>
          <div className="border border-gray-300 rounded flex items-center p-2.5">
            <UserKey className="mr-2" />
            <input
              id="confirmPassword"
              placeholder="Confirm Password"
              className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
              type="password"
              value={payload.confirmPassword}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <label className="flex items-center gap-1 cursor-pointer text-sm text-gray-600">
          <input id="terms-checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" type="checkbox" />I agree to the{" "}
          <a className="text-blue-600 hover:underline" href="/terms" data-discover="true">
            Terms and Conditions
          </a>
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-4 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
          Create Account <MoveRight color="#fff" />
        </button>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-1/2 h-px my-2 bg-gray-300 border-0" />
        </div>

        <button
          type="submit"
          className="w-full bg-neutral text-gray-500 border border-gray-300 py-4 px-4 rounded hover:bg-gray-300 hover:text-gray-600 transition flex justify-center items-center cursor-pointer"
        >
          Sign up with Google
        </button>
      </form>
    </div>
  );
};

export default CandidateRegister;
