import SetupProfileCard from "../components/SetupProfileCard";
import IconBox from "../components/IconBox";
import { BriefcaseBusiness, Bookmark, MoveRight, MapPin, CircleDot, UsersRound, EllipsisVertical } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { motion } from "framer-motion";

const tableHead = ["Jobs", "Applications", "Status", "Action"];
const tableData = [
  {
    logoUrl: "https://res.cloudinary.com/dnbswhvko/image/upload/v1779207605/nest_lwdfi3.svg",
    title: "Full Stack Developer",
    type: "Full-Time",
    location: "India",
    daysRemaining: 24,
    numOfApplicants: 302,
    status: "active",
  },
  {
    logoUrl: "https://res.cloudinary.com/dnbswhvko/image/upload/v1779207605/nest_lwdfi3.svg",
    title: "NodeJs Developer",
    type: "Remote",
    location: "India",
    daysRemaining: 15,
    numOfApplicants: 162,
    status: "active",
  },
  {
    logoUrl: "https://res.cloudinary.com/dnbswhvko/image/upload/v1779207605/nest_lwdfi3.svg",
    title: "Graphic Designer",
    type: "Temporary",
    location: "India",
    daysRemaining: 2,
    numOfApplicants: 8,
    status: "active",
  },
];

const iconBoxList = [
  {
    label: "Open Jobs",
    count: 299,
    icon: BriefcaseBusiness,
    bgColour: "bg-blue-600",
    animDelay: 0.1,
  },
  {
    label: "Saved Candidates",
    count: 106,
    icon: Bookmark,
    bgColour: "bg-violet-600",
    animDelay: 0.5,
  },
];

function CompanyOverview() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const { company } = useSelector((state) => state.company);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center mt-10 p-4">
          <Loader colour="text-blue-600" size="16" />
        </div>
      ) : (
        <>
          <div className="px-8 py-8">
            <div className="relative">
              <motion.img
                style={{ height: "160px" }}
                className="w-full rounded-lg object-cover"
                src={company?.banner?.url || "/src/assets/img/def-profile-banner.jpg"}
                alt="banner"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              />

              <motion.img
                style={{ width: "75px" }}
                className="rounded-xl absolute -bottom-1/4 left-6 p-0.5 border-2 border-blue-600"
                src={currentUser?.avatar?.url || "/src/assets/img/default-avatar.png"}
                alt="avatar"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <motion.div className="p-8 pt-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <h1 className="text-lg capitalize">Hello, {currentUser?.name}</h1>
            <p className="text-xs text-gray-800">Here's your daily activities and applications</p>

            <div className="flex justify-between gap-x-5 mt-5">
              {iconBoxList.map((box) => (
                <IconBox key={box.label} icon={box.icon} count={box.count} label={box.label} bgColour={box.bgColour} animDelay={box.animDelay} />
              ))}
            </div>

            {company?.registerStages !== "finished" && <SetupProfileCard currentUser={currentUser} />}

            <div className="mt-8">
              <div className="flex justify-between">
                <h1 className="text-sm font-medium">Recently Posed Jobs</h1>
                <button className="flex gap-x-2 text-sm text-gray-600 underline">
                  View all <MoveRight />
                </button>
              </div>

              <table className="w-full mt-5">
                <tbody>
                  <tr className="w-full  bg-gray-200 p-2">
                    {tableHead.map((head, i) => (
                      <th className="text-left text-sm p-2 text-gray-600 last:text-center" key={i}>
                        {head}
                      </th>
                    ))}
                  </tr>
                </tbody>

                <motion.tbody initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  {tableData.map((data, i) => (
                    <tr key={i} className="w-full border-b border-gray-300 hover:border hover:border-gray-300 cursor-pointer">
                      <td className=" flex py-4 pl-4 gap-x-4 items-center">
                        <img src={currentUser?.avatar?.url || data.logoUrl} className="w-20 rounded-lg" />
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
                          <button className="bg-gray-200 px-6 py-2 hover:bg-blue-600 hover:text-white rounded-sm transition">View Applications</button>
                          <EllipsisVertical />
                        </span>
                      </td>
                    </tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}

export default CompanyOverview;
