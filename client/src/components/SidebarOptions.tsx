import { type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

function SidebarOptions({ title, Icon, url }: { title: string; Icon: LucideIcon; url: string }) {
  return (
    <NavLink
      className={`flex py-4 ${url !== "/" ? "text-gray-500 hover:border-l-4 hover:border-blue-600 hover:bg-blue-100" : "text-gray-400 cursor-not-allowed"} transition cursor-pointer capitalize [&.active]:bg-blue-100 [&.active]:border-l-4 [&.active]:border-blue-600`}
      to={url}
    >
      <Icon className="mx-5" />
      {title}
    </NavLink>
  );
}

export default SidebarOptions;
