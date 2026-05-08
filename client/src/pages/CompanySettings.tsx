import { Outlet } from "react-router-dom";
import ProfileNavOption from "../components/ProfileNavOption";
import { CircleUser, Globe, UserRound } from "lucide-react";

const candidateSettingOptions = [
  {
    icon: UserRound,
    label: "Company-Info",
    url: "manage-company-info",
  },
  {
    icon: CircleUser,
    label: "Founding-Info",
    url: "manage-founding-info",
  },
  {
    icon: Globe,
    label: "Social links",
    url: "manage-social-info",
  },
];

function CompanySettings() {
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

export default CompanySettings;
