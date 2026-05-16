import { BadgeIndianRupee, FileUp, MapPin, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllApplications } from "../features/applicationSlice";

const tableHead = ["Candidates", "Date Applied", "Status", "Actions"];

const applicationStatusList = ["pending", "reviewed", "shortlisted", "rejected"];

function AppliedCandidates({ title = "Applied Candidates", data }) {
  const dispatch = useDispatch();
  const { applications, loading } = useSelector((state) => state.application);

  const [applicationStatus, setApplicationStatus] = useState("");

  const onChangeHandler = function (e) {
    setApplicationStatus(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllApplications({ label: "appliedCandidates" }));
  }, [dispatch]);

  return (
    <div className="w-full py-10 pl-10 pr-2">
      <div className="flex justify-between">
        <h1 className="text-sm font-medium">{title}</h1>
        <button className="flex gap-x-2 text-sm text-gray-600 hover:underline">
          View all <MoveRight />
        </button>
      </div>

      <table className="w-full mt-4">
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
          {applications?.map((el, i) => (
            <tr key={i} className="w-full border-b border-gray-300">
              <td className=" flex py-2 gap-x-4 items-center">
                <img src="/src/assets/img/icon-resume.png" className="w-20 py-1" />

                <div>
                  <h1 className="text-sm relative capitalize text-gray-900">
                    {el?.profile?.fullName || el.applicant?.name}
                    <span className="bg-gray-300 text-orange-600 font-medium mx-1 px-2 py-1 rounded-full text-[10px]"> {el?.profile?.headline || "Not Mentioned"}</span>
                  </h1>

                  <div className="flex gap-x-4 mt-2">
                    <span className="flex gap-x-1 text-xs text-gray-900">
                      <MapPin className="lucide-sm" color="gray" />
                      {el?.job?.location?.city}
                    </span>
                    <span className="flex gap-x-1 text-xs text-gray-900">
                      <FileUp className="lucide-sm" color="gray" />
                      {el?.profile?.totalExperience ? el?.profile?.totalExperience : "Not Mentioned"}
                    </span>
                  </div>
                </div>
              </td>

              <td className="text-sm relative capitalize text-gray-900">{new Date(el?.createdAt).toLocaleDateString()}</td>
              <td className="text-sm relative capitalize text-gray-900">{el?.status}</td>

              <td className="text-sm relative capitalize text-gray-900">
                <div className="flex items-center justify-center gap-x-2">
                  <a className="bg-gray-200 border border-blue-500 px-6 py-3 hover:bg-blue-600 hover:text-white rounded-sm transition" href={el?.resume?.url}>
                    View Resume
                  </a>

                  <select className="bg-gray-200 px-6 py-3 rounded-sm capitalize cursor-pointer" onChange={onChangeHandler}>
                    <option>Update Status</option>
                    {applicationStatusList?.map((status) => (
                      <option className="capitalize" value={status} key={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <button className="bg-blue-600 text-white px-6 py-3 rounded transition capitalize hover:bg-blue-700">update</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedCandidates;
