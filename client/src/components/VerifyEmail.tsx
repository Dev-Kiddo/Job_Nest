import { useEffect } from "react";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../features/userSlice";
import { useLocation, useSearchParams } from "react-router-dom";
import { CircleCheckBig, CircleX } from "lucide-react";

function VerifyEmail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser, message, error, success } = useSelector((state) => state.user);
  const [query, setQuery] = useSearchParams();

  const token = query.get("token");

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [token, dispatch]);

  return (
    <div className="max-w-2xl flex flex-col justify-center items-center p-10 mx-auto space-y-8 bg-white bg-opacity-50 rounded-lg">
      {!success && !error && <h2 className="text-center text-3xl font-semibold">Email Verification in Progress</h2>}

      {success && message && <h2 className="text-center text-3xl font-semibold">{message}</h2>}

      {!success && error && <h2 className="text-center text-3xl font-semibold">{error}</h2>}

      {!success && !error && <Loader colour="text-blue-500" />}
      {success && message && <CircleCheckBig />}
      {!success && error && <CircleX />}

      {!success && !error && (
        <p className="text-center">
          We are currently verifying your email address.
          <br /> <span className="font-semibold">Please do not close this page.</span> You will be redirected once the process is complete.
        </p>
      )}
    </div>
  );
}

export default VerifyEmail;
