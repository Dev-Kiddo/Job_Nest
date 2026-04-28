import { CircleUser, Globe, Settings, UserRound } from "lucide-react";

import ProfileNavOption from "../components/ProfileNavOption";
import { Outlet } from "react-router-dom";

const candidateSettingOptions = [
  {
    icon: UserRound,
    label: "Company Info",
    url: "company-info",
  },
  {
    icon: CircleUser,
    label: "Founding Info",
    url: "founding-info",
  },
  {
    icon: Globe,
    label: "Social Media Profile",
    url: "social-links",
  },
  {
    icon: Settings,
    label: "Contact",
    url: "#",
  },
];

function CreateCompany() {
  return (
    <div className="w-full py-10 pl-10 pr-2">
      <h1 className="text-xl">Setup Company Profile</h1>

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

export default CreateCompany;
