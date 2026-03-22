import { Mails } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../types/userTypes";

function CheckEmail() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <div className="max-w-2xl flex flex-col justify-center items-center p-10 mx-auto space-y-8 bg-white bg-opacity-50 rounded-lg">
      <div className="bg-blue-600 rounded-full p-4">
        <Mails className="lucide-big" />
      </div>

      <h2 className="text-center text-3xl font-semibold">Please check your email</h2>

      <p className="text-center">
        You're almost there! We sent an email to <br />
        <span className="font-semibold">{currentUser?.email}</span>
      </p>

      <p className="text-center">
        Just click on the link in that email to complete your signup. If you don't see it,
        <br /> you may need to check your spam folder.
      </p>

      <p className="text-center">Still can't find the email? No problem.</p>

      <button className="px-8 py-4 bg-blue-600 rounded text-white hover:bg-blue-700">Resend Verification Email</button>
    </div>
  );
}

export default CheckEmail;
