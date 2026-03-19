import { Lock, LogIn, LucideUpload, Mail, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, removeError, removeMessage } from "../features/userSlice";

interface IPayload {
  name: string;
  email: string;
  password: string;
  avatar: any;
}

const RegisterCandidate = function () {
  const [preview, setPreview] = useState(null);
  const [payload, setPayload] = useState<IPayload>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const dispatch = useDispatch();
  const { user, loading, message, error } = useSelector((state) => state.user);

  const onChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { id, files, value } = e.target;

    if (id === "avatar") {
      const file = files[0];

      if (!file) {
        return;
      }

      setPayload((payload) => ({ ...payload, avatar: file }));

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result);
        }
      };

      reader.onerror = (err) => {
        console.log("UPLOAD IMAGE ERR", err);
      };

      return;
    }
    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const onSubmitHandler = async function (e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("avatar", payload.avatar);

    if (!loading) {
      dispatch(registerUser(formData));
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
    <div className="w-full max-w-md mx-auto border border-gray-200 rounded-lg p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-1">Candidate Signup</h1>
        <p className="text-sm text-gray-600">Welcome! Please sign up to continue</p>
      </div>

      <form className="space-y-4" onSubmit={onSubmitHandler}>
        <div className="flex flex-col items-center mb-4">
          <label className="relative cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-orange-300 hover:border-blue-500 transition-colors">
              {preview ? <img src={preview} /> : <LucideUpload />}
            </div>
            <input id="avatar" className="hidden" accept="image/*" type="file" onChange={onChangeHandler} />
            <span className="block text-xs text-center mt-2 text-gray-500">Upload your photo</span>
          </label>
        </div>
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
              type="password"
              value={payload.password}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        {/* <label className="flex items-center gap-1 cursor-pointer text-sm text-gray-600">
          <input id="terms-checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300" type="checkbox" />I agree to the{" "}
          <a className="text-blue-600 hover:underline" href="/terms" data-discover="true">
            Terms and Conditions
          </a>
        </label> */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center cursor-pointer ">
          Create Account
        </button>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center cursor-pointer">
          <LogIn color="white" className="mr-2" />
          Sign up with Google
        </button>
        <div className="text-center text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:text-blue-800 font-medium hover:underline" to="/candidate-login" data-discover="true">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterCandidate;
