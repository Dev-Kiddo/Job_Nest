import Loader from "./Loader";
import CandidatesAppliedList from "./CandidatesAppliedList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllApplications } from "../features/applicationSlice";
import { MoveRight } from "lucide-react";

const tableHead = ["Candidates List", "Date Applied", "Current Status", "Actions"];

function AppliedCandidates({ title = "Applied Candidates" }) {
  const { applications, loading } = useSelector((state) => state.application);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllApplications({ label: "appliedCandidates" }));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mt-10 p-4">
          <Loader colour="text-blue-600" />
        </div>
      ) : (
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
                  <th className="text-left text-sm py-2 text-gray-600 last:text-center first:pl-2" key={i}>
                    {head}
                  </th>
                ))}
              </tr>
            </tbody>

            {applications?.map((application) => (
              <CandidatesAppliedList application={application} key={application._id} />
            ))}
          </table>
        </div>
      )}
    </>
  );
}

export default AppliedCandidates;
