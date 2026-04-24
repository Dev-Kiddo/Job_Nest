import { Building2 } from "lucide-react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";

function ChooseCompany() {
  // const [params] = useSearchParams();
  // const pp = params.get("token");
  // console.log(pp);

  // const location = useLocation();
  // console.log(location);
  // location.state = { hi: "hellos" };
  // console.log(location);
  return (
    <div className="w-full max-w-2xl mx-auto border border-gray-300 rounded-lg p-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-3 justify-center">
          <Building2 className="lucide-big" color="gray" />
          Establish Your Company Profile
        </h1>

        <p className="text-sm text-gray-600">
          Welcome! To begin, please tell us about your business. You can either register a brand-new entity to start from scratch or link an existing organization to manage your
          current operations and team data in one place.
        </p>

        <div className="flex justify-between items-center mt-10 gap-5">
          <Link to="/create-company" className="text-center font-medium text-white">
            <div className="bg-blue-600 hover:bg-blue-700 rounded-lg py-3 mx-auto px-8 ">
              Create New Company <br /> <span className="text-gray-200 text-xs">You're the first from your company</span>
            </div>
          </Link>

          <div className="w-[.5px] h-10 bg-gray-300"></div>

          <Link to="/join-company" className="text-center font-medium text-white">
            <div className="bg-orange-600 hover:bg-orange-700 rounded-lg py-3 mx-auto px-8">
              Join Existing Company <br /> <span className="text-gray-200 text-xs">Your company already registered</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChooseCompany;
