import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../features/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CircleCheckBig, CircleX } from "lucide-react";
import useToastMessage from "../hooks/useToastMessage";

function VerifyEmail() {
  const dispatch = useDispatch();
  const { currentUser, loading, message, messageType, isMessageShown } = useSelector((state) => state.user);

  const [query] = useSearchParams();

  const navigate = useNavigate();

  const token = query.get("token");

  useEffect(() => {
    if (!loading) {
      dispatch(verifyEmail(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (message && messageType === "success") {
      navigate("/login");
    }

    if (message && messageType === "error") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message, messageType, navigate]);

  useToastMessage("auth");

  return (
    <div className="max-w-2xl flex flex-col justify-center items-center p-10 mx-auto space-y-8 bg-white bg-opacity-50 rounded-lg">
      {!message && !messageType && !isMessageShown && <h2 className="text-center text-2xl font-semibold">Email Verification in Progress...</h2>}

      {message && (messageType === "success" || messageType === "error" || messageType === "info") && <h2 className="text-center text-2xl font-semibold">{message}</h2>}

      {message && messageType === "success" && <CircleCheckBig className="lucide-big" color="green" />}

      {message && messageType === "error" && <CircleX className="lucide-big" color="red" />}

      {!message && !isMessageShown && (
        <p className="text-center text-sm">
          We are currently verifying your email address.
          <br /> <span className="font-semibold">Please do not close this page.</span> You will be redirected once the process is complete.
        </p>
      )}
    </div>
  );
}

export default VerifyEmail;
