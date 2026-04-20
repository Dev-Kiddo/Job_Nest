import { Mail, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckEmail from "../components/CheckEmail";
import { forgotPassword } from "../features/userSlice";
import useToastMessage from "../hooks/useToastMessage";
import Loader from "../components/Loader";

function ForgotPassword() {
  const [payload, setPayload] = useState({
    email: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, messageType, isMessageShown } = useSelector((state) => state.user);

  const onChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const onSubmitHandler = async function (e) {
    e.preventDefault();
    dispatch(forgotPassword(payload));
  };

  useEffect(() => {
    if (message && messageType === "success" && !isMessageShown) {
      navigate("/check-email", { state: { allowAccess: true } });
    }
  }, [message, messageType, navigate, isMessageShown]);

  useToastMessage("user");

  return (
    <>
      <div className="w-full max-w-2xl mx-auto border border-gray-300 rounded-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700 mb-1">Forgot Password</h1>
          <p className="text-sm text-gray-600">
            Go back to{" "}
            <Link className="text-blue-600 underline font-medium" to="/register/candidate-register">
              Sign in
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Don't have an account{" "}
            <Link className="text-blue-600 underline font-medium" to="/register/candidate-register">
              Create account
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
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
              Submit {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
