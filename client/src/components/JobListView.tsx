import { BadgeIndianRupee, MapPin, MoveRight } from "lucide-react";

const tableHead = ["Job", "Date Applied", "Status", "Action"];

function JobListView({ title = "Recently Applied", applications }) {
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
          {applications?.map((data, i) => (
            <tr key={i} className="w-full border-b border-gray-300 hover:border hover:border-gray-300 hover:scale-200">
              <td className=" flex py-4 gap-x-4 items-center">
                <img src={data?.company?.logo?.url} className="w-28 px-4 py-2" />
                <div>
                  <h1 className="text-sm relative capitalize text-gray-900">
                    {data?.job?.title} <span className="bg-gray-300 text-orange-600 font-medium px-2 py-1 rounded-full text-[10px]">{data?.job?.jobType}</span>
                  </h1>
                  <div className="flex gap-x-4 mt-2">
                    <span className="flex gap-x-1 text-xs text-gray-900">
                      <MapPin className="lucide-sm" color="gray" />
                      {data?.job?.location?.country}
                    </span>
                    <span className="flex gap-x-1 text-xs text-gray-900">
                      <BadgeIndianRupee className="lucide-sm" color="gray" />${data?.job?.salary?.min}K-${data?.job?.salary?.max}K/month
                    </span>
                  </div>
                </div>
              </td>
              <td className="text-sm relative capitalize text-gray-900">{new Date(data?.job?.createdAt).toLocaleDateString()}</td>
              <td className="text-sm relative capitalize text-gray-900">{data?.status}</td>
              <td className="text-sm relative capitalize text-gray-900 text-center">
                <button className="bg-gray-200 px-6 py-3 hover:bg-blue-600 hover:text-white rounded-sm transition">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobListView;
