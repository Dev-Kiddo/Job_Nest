import { Files, ImageUp } from "lucide-react";
import { useSelector } from "react-redux";

function CandidateBasicInfo() {
  const { candidate } = useSelector((state) => state.candidate);

  console.log("CANDIDATE", candidate);

  return (
    <div>
      <h1 className="text-md mb-4 capitalize">Basic information</h1>

      <form>
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <div className="text-sm text-gray-500 row-span-2 items-center">
            Profile Picture
            <div className=" rounded mt-2 p-5">
              <img className="w-28 h-full rounded-full" src={candidate.avatar.url} alt="avatar" />
            </div>
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label htmlFor="phone" className="text-gray-500 capitalize">
              phone number
            </label>
            <input type="text" id="phone" disabled value={candidate?.phone} className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" />
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label htmlFor="location" className="capitalize text-gray-500">
              location
            </label>

            <input type="text" id="location" disabled value={candidate.location.country} className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" />
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label htmlFor="gender" className="text-gray-500 capitalize">
              Gender
            </label>

            <input type="text" id="phone" disabled value={candidate?.gender} className="w-full py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" />
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">Date of birth</label>

            <div className="text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
              <input type="text" id="phone" disabled value={candidate?.gender} className="w-full py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" />
            </div>
          </div>
        </div>

        <div className="text-gray-500 capitalize text-sm mt-6">
          Resume
          <div className="mt-2 p-5 cursor-pointer">
            <label htmlFor="resume" className="text-xs flex flex-col items-center justify-between gap-8 cursor-pointer">
              <Files className="lucide-big" color="#99a1af" />
              <p className="text-xs text-center text-gray-500">
                <span className="text-xs font-medium text-gray-800">Drag your resume here or Click to upload</span> <br />
                Acceptable file types: PDF, DOCX (5MB max)
              </p>
            </label>
            <input type="file" id="resume" accept=".pdf, application/pdf" hidden />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CandidateBasicInfo;
