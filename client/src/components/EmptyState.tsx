import { StickyNote } from "lucide-react";
import React from "react";

function EmptyState({ label, description }) {
  return (
    <div className="w-1/3 mx-auto flex flex-col items-center justify-center p-4 mt-8 border border-blue-200 rounded-lg">
      <div className="bg-blue-200 p-4 mb-4 rounded-full">
        <StickyNote color="#3b82f6" />
      </div>
      <h3 className="text-center text-lg font-medium">{label}</h3>
      <p className="text-center text-xs font-medium text-gray-600">{description}</p>
    </div>
  );
}

export default EmptyState;
