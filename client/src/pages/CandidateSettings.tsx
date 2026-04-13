import { CircleUser, Globe, Settings, UserRound } from "lucide-react";

import ProfileNavOption from "../components/ProfileNavOption";
import { Outlet } from "react-router-dom";

const candidateSettingOptions = [
  {
    icon: UserRound,
    label: "personal",
    url: "#",
  },
  {
    icon: CircleUser,
    label: "profile",
    url: "#",
  },
  {
    icon: Globe,
    label: "social links",
    url: "#",
  },
  {
    icon: Settings,
    label: "account settings",
    url: "#",
  },
];

function CandidateSettings() {
  return (
    <div className="w-full py-10 pl-10 pr-2">
      <h1 className="text-xl">Settings</h1>

      <nav className="mt-8 border-b border-b-gray-300 flex">
        {candidateSettingOptions.map((opt) => (
          <ProfileNavOption Icon={opt.icon} label={opt.label} url={opt.url} key={opt.label} />
        ))}
      </nav>

      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}

export default CandidateSettings;
