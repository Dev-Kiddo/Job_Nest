import { Eye, EyeOff, Lock, Mail, MoveRight, User, UserKey } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, clearMessage } from "../features/userSlice";
import useToastMessage from "../hooks/useToastMessage";
import Loader from "../components/Loader";

interface ICandidatePayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "seeker";
}

const CandidateRegister = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [payload, setPayload] = useState<ICandidatePayload>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "seeker",
  });

  const { showPassword, setShowPassword } = useOutletContext();

  const { currentUser, loading, message, messageType, isMessageShown } = useSelector((state) => state.user);

  const onChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const onSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!payload.name || !payload.email || !payload.password || !payload.confirmPassword) {
      toast.error("All the fields required", { toastId: `validate-${new Date(Date.now())}` });
      return;
    }

    if (!loading) {
      dispatch(registerUser(payload));
    }
  };

  const onOauthHandler = async function (e) {
    e.preventDefault();

    if (!loading) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`);

      const data = await res.json();

      console.log("DATA", data);

      const authURL = data.authUrl;

      window.location.href = authURL;
    }
  };

  useToastMessage("auth");

  useEffect(() => {
    if (message && messageType === "success" && !isMessageShown) {
      navigate("/check-email", { state: { allowAccess: true } });
    }
  }, [message, messageType, isMessageShown, dispatch, navigate]);

  return (
    <div className="w-full mx-auto rounded-lg">
      <form className="space-y-4" onSubmit={onSubmit}>
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
        <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
          Register as Candidate {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
        </button>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-1/2 h-px my-2 bg-gray-300 border-0" />
        </div>

        <button
          type="submit"
          className="w-full bg-neutral text-gray-500 border border-gray-300 py-3 px-4 rounded hover:bg-gray-300 hover:text-gray-600 transition flex justify-center items-center cursor-pointer"
          onClick={(e) => onOauthHandler(e)}
        >
          Sign up with Google
        </button>
      </form>
    </div>
  );
};

export default CandidateRegister;
