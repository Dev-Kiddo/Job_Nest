import { BellRing, Bookmark, BriefcaseBusiness, Dock, LogOut, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import { logoutUser } from "../features/userSlice";
import useToastMessage from "../hooks/useToastMessage";

function Dashboard() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const onLogoutHandler = function () {
    if (!loading) {
      dispatch(logoutUser());
    }
  };

  return (
    <div className="w-full flex">
      {/* SIDEBAR */}
      <div className=" flex w-1/6 border-r border-gray-300">
        <div className="w-full h-full flex flex-col justify-center">
          <p className="text-xs py-4 mx-5">Candidate Dashboard</p>

          <nav className="text-sm font-medium">
            <ul className="">
              <li className="flex py-4 text-gray-500 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100 transition cursor-pointer">
                <Dock className="mx-5" />
                Overview
              </li>
              <li className="flex py-4 text-gray-500 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100 transition cursor-pointer">
                <BriefcaseBusiness className="mx-5" />
                Applied Jobs
              </li>
              <li className="flex py-4 text-gray-500 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100 transition cursor-pointer">
                <Bookmark className="mx-5" />
                Favorite Jobs
              </li>
              <li className="flex py-4 text-gray-500 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100 transition cursor-pointer">
                <BellRing className="mx-5" />
                Jobs Alert
              </li>
              <li className="flex py-4 text-gray-500 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100 transition cursor-pointer">
                <Settings className="mx-5" />
                Settings
              </li>
            </ul>
          </nav>

          <div
            className="mt-auto text-sm font-medium flex py-4 text-gray-500 bg-red-100 border-l-4 border-red-300 bg-opacity-50 hover:border-l-4 hover:border-red-500 hover:bg-red-100 hover:text-red-500 transition cursor-pointer"
            onClick={onLogoutHandler}
          >
            <LogOut className="mx-5" />
            Log-out
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
