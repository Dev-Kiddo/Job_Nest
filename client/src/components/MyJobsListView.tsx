import { BadgeIndianRupee, BriefcaseBusiness, MoveRight } from "lucide-react";

import { Link } from "react-router-dom";

const tableHead = ["Job", "Date Posted", "Status", "Action"];

function MyJobsListView({ title = "Recently Posted", data }) {
  console.log(data);

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
          {data?.map((el, i) => (
            <tr key={i} className="w-full border-b border-gray-300 hover:scale-[1.01] duration-200 backface-hidden">
              <td className=" flex py-2 gap-x-4 items-center">
                <img src={el?.company?.logo?.url} className="w-24 py-1" />
                <div>
                  <h1 className="text-sm relative capitalize text-gray-900">
                    {el?.title} <span className="bg-gray-300 text-orange-600 font-medium px-2 py-1 rounded-full text-[10px]">{el?.workMode}</span>
                  </h1>
                  <div className="flex gap-x-4 mt-2">
                    <span className="flex gap-x-1 text-xs text-gray-900 capitalize">
                      <BriefcaseBusiness className="lucide-sm" color="gray" />
                      {el?.educationRequired}
                    </span>
                    <span className="flex gap-x-1 text-xs text-gray-900">
                      <BadgeIndianRupee className="lucide-sm" color="gray" />${el?.salary?.min}K-${el?.salary?.max}K/month
                    </span>
                  </div>
                </div>
              </td>
              <td className="text-sm relative capitalize text-gray-900">{new Date(el?.createdAt).toLocaleDateString()}</td>
              <td className="text-sm relative capitalize text-gray-900">{el?.status}</td>

              <td className="text-sm relative capitalize text-gray-900 text-center">
                <Link to="/dashboard/recruiter/applied-candidates" className="bg-gray-200 px-6 py-3 hover:bg-blue-600 hover:text-white rounded-sm transition">
                  Manage
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyJobsListView;
