import { type LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  count: number;
  label: string;
  bgColour: string;
}

function IconBox({ icon: Icon, count, label, bgColour = "white" }: IconButtonProps) {
  return (
    <div className={`flex-1 ${bgColour} bg-opacity-40 flex items-center justify-between rounded-lg p-4 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer group`}>
      <div>
        <h3 className="font-semibold text-gray-900">{count}</h3>
        <p className="text-gray-500 text-xs mt-3 font-medium">{label}</p>
      </div>

      <div className={`w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4 transition`}>
        <Icon className={`lucide-big transition`} />
      </div>
    </div>
  );
}

export default IconBox;
