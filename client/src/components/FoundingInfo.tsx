import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { CloudCog, MoveRight } from "lucide-react";
import { City, State, Country } from "country-state-city";

const organizationType = [
  { type: "Select", value: "" },
  { type: "public", value: "public" },
  { type: "private", value: "private" },
  { type: "startup", value: "startup" },
  { type: "nonprofit", value: "nonprofit" },
  { type: "government", value: "government" },
];

const companySizes = ["Select", "1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5000+"];

function FoundingInfo() {
  const { loading } = useSelector((state) => state.user);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const getCountries = Country.getAllCountries();
  const getStates = State.getStatesOfCountry(country);
  const getCities = City.getCitiesOfState(country, state);

  return (
    <div className="max-w-6xl mx-auto">
      <form>
        <div className="flex gap-4">
          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">Organization Type</label>
            <select className="bg-gray-200 text-gray-800 p-2 my-1">
              {organizationType.map((type) => (
                <option className="capitalize " value={type.value} key={type.value}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">Company Size</label>
            <select className="bg-gray-200 text-gray-800 p-2 my-1">
              {companySizes.map((size) => (
                <option className="capitalize " value={size} key={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">Country</label>
            <select className="bg-gray-200 text-gray-800 p-2 my-1" onClick={(e) => setCountry(() => e.target.value)}>
              <option value="">Select</option>
              {getCountries.map((cont) => (
                <option key={cont.isoCode} value={cont.isoCode}>
                  {cont.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">State</label>
            <select className="bg-gray-200 text-gray-800 p-2 my-1" onClick={(e) => setState(() => e.target.value)}>
              <option value="">Select</option>
              {getStates?.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">City</label>
            <select className="bg-gray-200 text-gray-800 p-2 my-1" onClick={(e) => setCity(() => e.target.value)}>
              <option value="">Select</option>
              {getCities?.map((city) => (
                <option key={city.isoCode} value={city.isoCode}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">Email</label>
            <input type="text" className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" autoComplete="disabled" />
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">Phone</label>

            <input type="text" className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" />
          </div>
        </div>

        <div className="flex mt-6 gap-4">
          <Link
            to="/create-company/company-info"
            type="submit"
            className="bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer "
          >
            Previous
          </Link>
          <button type="submit" className="bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
            Save & Next {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FoundingInfo;
