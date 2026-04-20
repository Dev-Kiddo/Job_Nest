import { Mails } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useToastMessage from "../hooks/useToastMessage";

function CheckEmail({ btnName = "Resend" }) {
  const navigate = useNavigate();
  const { currentUser, message, messageType } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (message && messageType === "success") {
  //     navigate("/login");
  //   }

  //   if (message && messageType === "error") {
  //     navigate("/");
  //   }
  // }, [message, messageType, navigate]);

  useToastMessage("user");

  return (
    <div className="max-w-2xl flex flex-col justify-center items-center p-10 mx-auto space-y-8 bg-white bg-opacity-50 rounded-lg">
      <div className="bg-blue-600 rounded-full p-4">
        <Mails className="lucide-big" />
      </div>

      <h2 className="text-center text-2xl font-semibold">Please check your email</h2>

      <p className="text-center text-sm">
        You're almost there! We’ve sent an email to
        <br />
        <span className="font-semibold">{currentUser?.email}</span>
      </p>

      <p className="text-center text-sm">
        Just click on the button in that email to continue. If you don’t see it,
        <br /> you may need to check your spam or junk folder.
      </p>

      <p className="text-center text-sm">Still can't find the email? No problem.</p>

      <button className="px-8 py-3 bg-blue-600 rounded text-white hover:bg-blue-700">{btnName}</button>
    </div>
  );
}

export default CheckEmail;
