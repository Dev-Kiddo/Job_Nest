import React from "react";
import { NavLink } from "react-router-dom";

function ProfileNavOption({ Icon, label, url }: { Icon: React.ElementType; label: string; url: string }) {
  return (
    <NavLink to={url} className="flex items-center gap-x-2 cursor-pointer  px-6 py-2 hover:border-b-2 border-blue-500 group">
      <Icon className="lucide-sm" color="#2563EB" />
      <span className="text-sm font-medium capitalize text-gray-500 group-hover:text-blue-500">{label}</span>
    </NavLink>
  );
}

export default ProfileNavOption;
