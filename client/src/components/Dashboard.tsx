import { BellRing, Bookmark, BriefcaseBusiness, Building2, CirclePlus, CircleUser, Dock, LogOut, NotebookPen, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import { logoutUser } from "../features/userSlice";
import useToastMessage from "../hooks/useToastMessage";
import SidebarOptions from "./SidebarOptions";

const candidateSidebar = [
  { title: "overview", icon: Dock, url: "/" },
  { title: "applied jobs", icon: BriefcaseBusiness, url: "/" },
  { title: "favorite jobs", icon: Bookmark, url: "/" },
  { title: "job alert", icon: BellRing, url: "/" },
  { title: "settings", icon: Settings, url: "candidate/settings" },
];

const RecruiterSidebar = [
  { title: "overview", icon: Dock, url: "/" },
  { title: "employer's profile", icon: CircleUser, url: "/" },
  { title: "post a job", icon: CirclePlus, url: "/" },
  { title: "my jobs", icon: BriefcaseBusiness, url: "/" },
  { title: "saved candidates", icon: Bookmark, url: "/" },
  { title: "plans & billing", icon: NotebookPen, url: "/" },
  { title: "all companies", icon: Building2, url: "/" },
  { title: "settings", icon: Settings, url: "" },
];

function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);

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
          <p className="text-xs py-4 mx-5">{currentUser?.role === "candidate" ? "Candidate" : "Recruiter"} Dashboard</p>

          <nav className="text-sm font-medium">
            <ul className="">
              {currentUser.role === "candidate" && candidateSidebar.map((opt) => <SidebarOptions Icon={opt.icon} title={opt.title} url={opt.url} key={opt.title} />)}

              {currentUser.role === "recruiter" && RecruiterSidebar.map((opt) => <SidebarOptions Icon={opt.icon} title={opt.title} url={opt.url} key={opt.title} />)}
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
