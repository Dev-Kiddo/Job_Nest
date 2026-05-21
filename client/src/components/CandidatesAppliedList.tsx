import { FileUp, MapPin, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateApplicationStatus } from "../features/applicationSlice";
import { motion } from "framer-motion";

const applicationStatusList = ["pending", "reviewed", "shortlisted", "rejected"];

function CandidatesAppliedList({ application }) {
  const [applicationStatus, setApplicationStatus] = useState(application?.status || "");

  const dispatch = useDispatch();

  const onChangeHandler = function (e) {
    setApplicationStatus(e.target.value);
  };

  const onUpdateHandler = function (event, id) {
    event.preventDefault();

    dispatch(updateApplicationStatus({ id, applicationStatus: { status: applicationStatus } }));
  };

  return (
    <motion.tbody initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <tr className="w-full border-b border-gray-300">
        <td className=" flex py-2 gap-x-4 items-center">
          <img src="https://res.cloudinary.com/dnbswhvko/image/upload/v1779276986/icon-resume_bmehhw.png" className="w-20 py-1" />

          <div>
            <h1 className="text-sm relative capitalize text-gray-900">
              {application?.profile?.fullName || application?.applicant?.name}
              <span className="bg-gray-300 text-orange-600 font-medium mx-1 px-2 py-1 rounded-full text-[10px]"> Not Mentioned</span>
            </h1>

            <div className="flex gap-x-4 mt-2">
              <span className="flex gap-x-1 text-xs text-gray-900">
                <MapPin className="lucide-sm" color="gray" />
                {application?.job?.location?.city}
              </span>
              <span className="flex gap-x-1 text-xs text-gray-900">
                <FileUp className="lucide-sm" color="gray" />
                {application?.profile?.totalExperience ? application?.profile?.totalExperience : "Not Mentioned"}
              </span>
            </div>
          </div>
        </td>

        <td className="text-sm relative capitalize text-gray-900">{new Date(application?.createdAt).toLocaleDateString()}</td>

        <td className="text-sm relative capitalize text-gray-900">
          {application?.status === "pending" && (
            <span className="inline-flex items-center rounded-md bg-blue-400/20 px-2 py-1 text-xs font-medium text-blue-600">{application?.status}</span>
          )}

          {application.status === "reviewed" && (
            <span className="inline-flex items-center rounded-md bg-yellow-400/20 px-2 py-1 text-xs font-medium text-yellow-600">{application?.status}</span>
          )}

          {application.status === "shortlisted" && (
            <span className="inline-flex items-center rounded-md bg-green-400/20 px-2 py-1 text-xs font-medium text-green-600">{application?.status}</span>
          )}

          {application.status === "rejected" && (
            <span className="inline-flex items-center rounded-md bg-red-400/20 px-2 py-1 text-xs font-medium text-red-600">{application?.status}</span>
          )}
        </td>

        <td className="text-sm relative capitalize text-gray-900">
          <div className="flex items-center justify-center gap-x-2">
            <a className="bg-gray-200 border border-blue-600 px-6 py-2 hover:bg-blue-600 hover:text-white rounded-sm transition" target="_blank" href={application?.resume?.url}>
              View Resume
            </a>

            <select className="bg-gray-200 px-6 py-2 rounded-sm capitalize cursor-pointer" value={applicationStatus} onChange={onChangeHandler}>
              <option>Update Status</option>
              {applicationStatusList?.map((status) => (
                <option className="capitalize" value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>

            <button
              disabled={applicationStatus === application.status}
              className={`${applicationStatus === application.status ? "cursor-not-allowed" : "cursor-pointer"} bg-blue-600 text-white px-6 py-2 rounded transition capitalize hover:bg-blue-700`}
              onClick={(event) => onUpdateHandler(event, application._id)}
            >
              update
            </button>
          </div>
        </td>
      </tr>
    </motion.tbody>
  );
}

export default CandidatesAppliedList;
