import React from "react";
import { type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

function SidebarOptions({ title, Icon, url }: { title: string; Icon: LucideIcon; url: string }) {
  return (
    <NavLink className="flex py-4 text-gray-500 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100 transition cursor-pointer capitalize" to={url}>
      <Icon className="mx-5" />
      {title}
    </NavLink>
  );
}

export default SidebarOptions;
