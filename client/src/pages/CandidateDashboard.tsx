import { BriefcaseBusiness, Bookmark, BellRing } from "lucide-react";
import IconBoxsTest from "../components/IconBox";

function CandidateDashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between gap-x-5">
        <IconBoxsTest icon={BriefcaseBusiness} count={659} label="Applied Jobs" bgColour="bg-blue-400" />
        <IconBoxsTest icon={Bookmark} count={325} label="Favorite Jobs" bgColour="bg-orange-500" />
        <IconBoxsTest icon={BellRing} count={270} label="Job Alerts" bgColour="bg-green-600" />
      </div>
    </div>
  );
}

export default CandidateDashboard;
