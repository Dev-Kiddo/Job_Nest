import { Eye, EyeOff, Lock, MoveRight, UserKey } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToastMessage from "../hooks/useToastMessage";
import { resetPassword } from "../features/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [query] = useSearchParams();

  const token = query.get("token");

  const [payload, setPayload] = useState({
    password: "",
    confirmPassword: "",
    token: token || null,
  });

  const { message, messageType, isMessageShown } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onChangeHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const onSubmitHandler = async function (e) {
    e.preventDefault();
    if (!payload.password || !payload.confirmPassword) {
      console.log("All the fields required");
    }

    dispatch(resetPassword(payload));
  };

  useEffect(() => {
    if (message && messageType === "success" && !isMessageShown) {
      navigate("/login");
    }
  }, [message, messageType, navigate, isMessageShown]);

  useToastMessage("user");
  return (
    <>
      <div className="w-full max-w-2xl mx-auto border border-gray-300 rounded-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700 mb-1">Reset Password</h1>
          <p className="text-sm text-gray-600">
            Enter your new password below to update your account.
            <br /> Make sure your password is strong and secure.
          </p>
        </div>

        <div className="w-full mx-auto rounded-lg">
          <form className="space-y-4" onSubmit={onSubmitHandler}>
            <div className="space-y-3">
              <div className="border border-gray-300 rounded flex items-center p-2.5">
                <Lock className="mr-2" />
                <input
                  id="password"
                  placeholder="New Password"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                  type={showPassword ? "text" : "password"}
                  value={payload.password}
                  onChange={onChangeHandler}
                />

                {showPassword ? <EyeOff onClick={() => setShowPassword((pass) => !pass)} /> : <Eye onClick={() => setShowPassword((pass) => !pass)} />}
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

                {/* {showPassword ? <EyeOff onClick={() => setShowPassword((pass) => !pass)} /> : <Eye onClick={() => setShowPassword((pass) => !pass)} />} */}
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
              Reset Password <MoveRight color="#fff" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
