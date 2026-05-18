import { Outlet } from "react-router-dom";
import ProfileNavOption from "../components/ProfileNavOption";
import { CircleUser, Globe, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="w-full py-10 pl-10 pr-2">
      {isLoading ? (
        <div className="flex items-center justify-center mt-10 p-4">
          <Loader colour="text-blue-600" size="16" />
        </div>
      ) : (
        <>
          <h1 className="text-xl">Settings</h1>

          <nav className="mt-8 border-b border-b-gray-300 flex">
            {candidateSettingOptions.map((opt) => (
              <ProfileNavOption Icon={opt.icon} label={opt.label} url={opt.url} key={opt.label} />
            ))}
          </nav>
          <div className="mt-8">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default CompanySettings;
