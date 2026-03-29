import { BriefcaseBusiness, Bookmark, MoveRight, MapPin, BadgeIndianRupee, CircleDashed, CircleDot, UsersRound, EllipsisVertical } from "lucide-react";
import IconBoxsTest from "../components/IconBox";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const tableHead = ["Jobs", "Applications", "Status", "Action"];
const tableData = [
  {
    logoUrl: "/src/assets/img/jobnest.svg",
    title: "Full Stack Developer",
    type: "Full-Time",
    location: "India",
    daysRemaining: 24,
    numOfApplicants: 302,
    status: "active",
  },
  {
    logoUrl: "/src/assets/img/jobnest.svg",
    title: "NodeJs Developer",
    type: "Remote",
    location: "India",
    daysRemaining: 15,
    numOfApplicants: 162,
    status: "active",
  },
  {
    logoUrl: "/src/assets/img/jobnest.svg",
    title: "Graphic Designer",
    type: "Temporary",
    location: "India",
    daysRemaining: 2,
    numOfApplicants: 8,
    status: "active",
  },
  {
    logoUrl: "/src/assets/img/jobnest.svg",
    title: "Graphic Designer",
    type: "Temporary",
    location: "India",
    daysRemaining: 9,
    numOfApplicants: 255,
    status: "Expire",
  },
];

function RecruiterDashboard() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const role = useOutletContext();

  console.log("ROLE", role);

  return (
    <div className="p-8 mt-2">
      <h1 className="text-lg capitalize">Hello, {currentUser?.name}</h1>
      <p className="text-xs text-gray-800">Here's your daily activities and applications</p>

      <div className="flex justify-between gap-x-5 mt-5">
        <IconBoxsTest icon={BriefcaseBusiness} count={444} label="Open Jobs" bgColour="bg-blue-600" />
        <IconBoxsTest icon={Bookmark} count={125} label="Saved Candidates" bgColour="bg-orange-600" />
      </div>

      <div className={`bg-[#E05151] bg-opacity-90 flex flex-1 items-center justify-between rounded-lg p-5 mt-5 space-x-5`}>
        <div className="flex items-center gap-5">
          <img
            className="rounded-full"
            // src={currentUser?.avatar.url || "https://lh3.googleusercontent.com/a/ACg8ocLym0EgCNR462bJKtifQI73252BCTrJfVLgMO1iOa6GXlmTAsc=s96-c"}
            src={currentUser.avatar.url}
          />

          <div>
            <h4 className="text-md text-gray-200 mb-2">Your company profile is not complete.</h4>
            <p className="text-xs text-gray-200">Finish it now to improve visibility and attract the right talent.</p>
          </div>
        </div>

        <button className="flex items-center gap-x-2 text-sm text-[#E05151] bg-white px-6 py-2 rounded-sm cursor-pointer hover:bg-gray-100">
          Setup Profile <MoveRight color="#E05151" />
        </button>
      </div>

      <div className="mt-6">
        <div className="flex justify-between">
          <h1 className="text-sm font-medium">Recently Posed Jobs</h1>
          <button className="flex gap-x-2 text-sm text-gray-600 hover:underline">
            View all <MoveRight />
          </button>
        </div>

        <table className="w-full mt-4">
          <tbody>
            <tr className="w-full bg-gray-200 p-2">
              {tableHead.map((head, i) => (
                <th className="text-center text-sm p-2 text-gray-600" key={i}>
                  {head}
                </th>
              ))}
            </tr>
          </tbody>

          <tbody>
            {tableData.map((data, i) => (
              <tr key={i} className="w-full border-b border-gray-300 hover:border hover:border-gray-300">
                <td className=" flex py-4 gap-x-4 items-center">
                  <img src={data.logoUrl} className="w-15 h-15 px-4 py-2" />
                  <div>
                    <h1 className="text-sm relative capitalize text-gray-900">
                      {data.title} <span className="bg-gray-300 text-green-600 font-medium px-2 py-1 rounded-full text-[10px]">{data.type}</span>
                    </h1>

                    <div className="flex gap-x-4 mt-2">
                      <span className="flex gap-x-1 text-xs text-gray-900">
                        <MapPin className="lucide-sm" color="gray" />
                        {data.location}
                      </span>
                      <span className="flex gap-x-1 text-xs text-gray-900">
                        <CircleDot className="lucide-sm" color="gray" />
                        {data.daysRemaining || "-"} days remaining
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-sm relative capitalize text-gray-900">
                  <span className="flex gap-x-1 text-xs text-gray-900">
                    <UsersRound className="lucide-sm" color="gray" />
                    {data.numOfApplicants} Applications
                  </span>
                </td>
                <td className="text-sm relative capitalize text-gray-900">{data.status}</td>
                <td className="text-sm relative capitalize text-gray-900 text-center">
                  <span className="flex items-center justify-center cursor-pointer gap-x-1 text-xs text-gray-900">
                    <button className="bg-gray-200 px-6 py-3 hover:bg-blue-600 hover:text-white rounded-sm transition">View Applications</button>
                    <EllipsisVertical />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
