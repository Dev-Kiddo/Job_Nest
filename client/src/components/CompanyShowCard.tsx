import { Bookmark, MapPin } from "lucide-react";

function CompanyShowCard({ company }) {
  return (
    <div className={`p-4 rounded-lg border border-gray-300 shadow-sm cursor-pointer flex gap-4`}>
      <img className="w-12" src="/src/assets/img/icon-google.svg" alt="company?-logo" />

      <div>
        <h1 className="text-sm font-semibold capitalize">{company?.name}</h1>

        <div className="flex gap-x-2 items-center mt-1">
          <span className="py-0.5 px-1 bg-green-200 text-[10px] uppercase font-semibold text-green-800 rounded-sm">⭐{company?.rating}</span>

          <div className="w-0.5 h-3 bg-gray-300"></div>

          <div className="text-gray-500 text-xs">{company?.reviews} reviews</div>
        </div>

        <div className="flex items-center justify-between gap-x-4 mt-3">
          {company?.tags?.map((tag) => (
            <div className="text-[10px] bg-gray-200 p-1 rounded-md border border-gray-300 capitalize hover:bg-gray-300">{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyShowCard;
