import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SetupProfileCard from "./SetupProfileCard";
import { BadgeIndianRupee, BellRing, Bookmark, BriefcaseBusiness, MapPin, MoveRight } from "lucide-react";
import IconBox from "./IconBox";
import Loader from "./Loader";

const tableHead = ["Job", "Date Applied", "Status", "Action"];

const tableData = [
  {
    logoUrl: "/src/assets/img/jobnest.svg",
    title: "Full Stack Developer",
    type: "Full-Time",
    location: "India",
    salaryRange: [50, 80],
    DateApplied: new Date().toISOString(),
    status: "active",
  },
  {
    logoUrl: "/src/assets/img/jobnest.svg",
    title: "NodeJs Developer",
    type: "Remote",
    location: "India",
    salaryRange: [30, 60],
    DateApplied: new Date().toISOString(),
    status: "active",
  },
  {
    logoUrl: "/src/assets/img/jobnest.svg",
    title: "Graphic Designer",
    type: "Temporary",
    location: "India",
    salaryRange: [25, 50],
    DateApplied: new Date().toISOString(),
    status: "active",
  },
];

const iconBoxList = [
  {
    label: "Applied Jobs",
    count: 659,
    icon: BriefcaseBusiness,
    bgColour: "bg-blue-600",
  },
  {
    label: "Favorite Jobs",
    count: 156,
    icon: Bookmark,
    bgColour: "bg-orange-600",
  },
  {
    label: "Job Alerts",
    count: 244,
    icon: BellRing,
    bgColour: "bg-green-600",
  },
];

function CandidateOverview() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, loading } = useSelector((state) => state.user);
  const { candidate, loading: profileLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center mt-10 p-4">
          <Loader colour="text-blue-600" />
        </div>
      ) : (
        <>
          <div className="px-8 py-8">
            <div className="relative">
              <img style={{ height: "160px" }} className="w-full rounded-lg object-cover" src={candidate?.banner?.url || "/src/assets/img/def-profile-banner.jpg"} alt="banner" />

              <img
                style={{ width: "75px" }}
                className="rounded-xl absolute -bottom-1/4 left-6 p-0.5 border-2 border-blue-600"
                src={currentUser?.avatar?.url || "/src/assets/img/default-avatar.png"}
                alt="avatar"
              />
            </div>
          </div>

          <div className="px-8 pt-8">
            <h1 className="text-xl font-semibold capitalize">Hello, {currentUser?.name}</h1>
            <p className="text-xs text-gray-800">Here's your daily activities and job alerts</p>

            <div className="flex justify-between gap-x-5 mt-5">
              {iconBoxList.map((box) => (
                <IconBox key={box.label} icon={box.icon} count={box.count} label={box.label} bgColour={box.bgColour} />
              ))}
            </div>

            <SetupProfileCard currentUser={currentUser} />

            <div className="mt-8">
              <div className="flex justify-between">
                <h1 className="text-sm font-medium">Recently Applied</h1>
                <button className="flex gap-x-2 text-sm text-gray-600 underline">
                  View all <MoveRight />
                </button>
              </div>

              <table className="w-full mt-5">
                <tbody>
                  <tr className="w-full bg-gray-200 p-2">
                    {tableHead.map((head, i) => (
                      <th className="text-left text-sm p-2 text-gray-600 last:text-center" key={i}>
                        {head}
                      </th>
                    ))}
                  </tr>
                </tbody>

                <tbody>
                  {tableData.map((data, i) => (
                    <tr key={i} className="w-full border-b border-gray-300 hover:border hover:border-gray-300">
                      <td className=" flex py-4 gap-x-4 items-center">
                        <img src={data.logoUrl} className="w-20 px-4 py-2" />
                        <div>
                          <h1 className="text-sm relative capitalize text-gray-900">
                            {data.title} <span className="bg-gray-300 text-orange-600 font-medium px-2 py-1 rounded-full text-[10px]">{data.type}</span>
                          </h1>
                          <div className="flex gap-x-4 mt-2">
                            <span className="flex gap-x-1 text-xs text-gray-900">
                              <MapPin className="lucide-sm" color="gray" />
                              {data.location}
                            </span>
                            <span className="flex gap-x-1 text-xs text-gray-900">
                              <BadgeIndianRupee className="lucide-sm" color="gray" />${data.salaryRange[0]}K-${data.salaryRange[1]}K/month
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm relative capitalize text-gray-900">{data.DateApplied}</td>
                      <td className="text-sm relative capitalize text-gray-900">{data.status}</td>
                      <td className="text-sm relative capitalize text-gray-900 text-center">
                        <button className="bg-gray-200 px-6 py-2 hover:bg-blue-600 hover:text-white rounded-sm transition">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CandidateOverview;
