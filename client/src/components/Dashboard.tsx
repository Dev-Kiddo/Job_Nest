import { BellRing, Bookmark, BriefcaseBusiness, Dock, LogOut, Settings } from "lucide-react";
import CandidateDashboard from "../pages/CandidateDashboard";
import IconBoxsTest from "./IconBox";

function Dashboard() {
  return (
    <div className="w-full flex">
      <div className=" flex w-1/6">
        <div className="w-full h-screen flex flex-col justify-center">
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

          <div className="mt-auto text-sm font-medium flex py-4 text-gray-500 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100 transition cursor-pointer">
            <LogOut className="mx-5" />
            Log-out
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <CandidateDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
