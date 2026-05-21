import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface IconButtonProps {
  icon: LucideIcon;
  count: number;
  label: string;
  bgColour: string;
}

function IconBox({ icon: Icon, count, label, bgColour = "white", animDelay }: IconButtonProps) {
  // console.log(animDelay);

  return (
    <motion.div
      className={`flex-1 ${bgColour} bg-opacity-40 flex items-center justify-between rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition cursor-pointer group`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: animDelay, ease: "linear" }}
    >
      <div>
        <h3 className="font-semibold text-gray-700">{count}</h3>
        <p className="text-white text-xs mt-3 font-medium">{label}</p>
      </div>

      <div className={`w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center transition`}>
        <Icon className={`lucide-big transition`} />
      </div>
    </motion.div>
  );
}

export default IconBox;
