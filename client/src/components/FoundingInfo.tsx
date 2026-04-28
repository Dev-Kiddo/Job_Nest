import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { MoveRight } from "lucide-react";
import { City, State, Country } from "country-state-city";
import { clearMessage, updateCompanyInfo } from "../features/companySlice";
import useToastMessage from "../hooks/useToastMessage";

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
  const { company, loading, message, messageType, isMessageShown } = useSelector((state) => state.company);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const getCountries = Country.getAllCountries();
  const getStates = State.getStatesOfCountry(country);
  const getCities = City.getCitiesOfState(country, state);

  const [payload, setPayload] = useState({
    companyType: "",
    companySize: "",
    country: "",
    state: "",
    city: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleOnChange = function (event) {
    const { id, value } = event.target;

    console.log("value", value);
    setPayload((data) => ({ ...data, [id]: value }));
  };

  const handleSubmit = function (event) {
    event.preventDefault();

    dispatch(updateCompanyInfo({ payload, companyId: company }));
  };

  useEffect(() => {
    if (messageType === "success" && message) {
      navigate("/create-company/social-links");
      dispatch(clearMessage());
    }
  }, [message, messageType, navigate, dispatch]);

  useToastMessage("company");

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="companyType" className="text-gray-500 capitalize">
              Organization Type <span className="text-blue-500">*</span>
            </label>

            <select id="companyType" className="bg-gray-200 text-gray-800 p-2 my-1" onChange={handleOnChange} required>
              {organizationType.map((type) => (
                <option className="capitalize " value={type.value} key={type.value}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="companySize" className="text-gray-500 capitalize">
              Company Size <span className="text-blue-500">*</span>
            </label>

            <select id="companySize" className="bg-gray-200 text-gray-800 p-2 my-1" onChange={handleOnChange} required>
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
            <label htmlFor="country" className="text-gray-500 capitalize">
              Country
            </label>

            <select onClick={(e) => setCountry(() => e.target.value)} onChange={handleOnChange} id="country" className="bg-gray-200 text-gray-800 p-2 my-1">
              <option value="">Select</option>
              {getCountries.map((cont) => (
                <option key={cont.name} value={cont.isoCode}>
                  {cont.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="state" className="text-gray-500 capitalize">
              State
            </label>

            <select id="state" className="bg-gray-200 text-gray-800 p-2 my-1" onClick={(e) => setState(() => e.target.value)} onChange={handleOnChange}>
              <option value="">Select</option>
              {getStates?.map((state) => (
                <option key={state.name} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="city" className="text-gray-500 capitalize">
              City
            </label>
            <select id="city" className="bg-gray-200 text-gray-800 p-2 my-1" onClick={(e) => setCity(() => e.target.value)} onChange={handleOnChange}>
              <option value="">Select</option>
              {getCities?.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="contactEmail" className="text-gray-500 capitalize">
              Email
            </label>

            <input
              id="contactEmail"
              onChange={handleOnChange}
              type="text"
              className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
              autoComplete="disabled"
            />
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="contactPhone" className="text-gray-500 capitalize">
              Phone
            </label>

            <input onChange={handleOnChange} id="contactPhone" type="text" className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" />
          </div>
        </div>

        <div className="flex mt-6 gap-4">
          <Link
            to="/create-company/company-info"
            type="button"
            className="border-2 border-gray-300 text-gray-500 py-3 px-4 rounded hover:bg-gray-300 transition flex justify-center items-center gap-2 cursor-pointer "
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
