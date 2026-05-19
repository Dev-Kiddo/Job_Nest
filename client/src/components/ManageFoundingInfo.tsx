import React, { useEffect, useState } from "react";
import { updateCompanyInfo } from "../features/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { City, Country, State } from "country-state-city";
import Loader from "./Loader";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

const organizationType = [
  { type: "Select", value: "" },
  { type: "public", value: "public" },
  { type: "private", value: "private" },
  { type: "startup", value: "startup" },
  { type: "nonprofit", value: "nonprofit" },
  { type: "government", value: "government" },
];

const companySizes = ["Select", "1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5000+"];

function ManageFoundingInfo() {
  const { company, loading, message, messageType, isMessageShown } = useSelector((state) => state.company);

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const getCountries = Country.getAllCountries();
  const getStates = State.getStatesOfCountry(country);
  const getCities = City.getCitiesOfState(country, state);

  const [payload, setPayload] = useState({
    companyType: company?.companyType || "",
    companySize: company?.companySize || "",
    location: {
      country: company?.location?.country || "",
      state: company?.location?.state || "",
      city: company?.location?.city || "",
    },
    contactEmail: company?.contactEmail || "",
    contactPhone: company?.contactPhone || "",
  });

  const handleOnChange = function (event) {
    const { id, value } = event.target;

    if (id === "country" || id === "state" || id === "city") {
      setPayload((data) => ({ ...data, location: { ...data.location, [id]: value } }));
      return;
    }

    setPayload((data) => ({ ...data, [id]: value }));
  };

  const handleSubmit = function (event) {
    event.preventDefault();

    dispatch(updateCompanyInfo({ payload, companyId: company }));
  };

  useEffect(() => {
    if (!loading && messageType === "success") {
      setIsEdit(false);
    }
  }, [loading, messageType]);

  return (
    <motion.div className="w-full" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="companyType" className="text-gray-500 capitalize">
              Organization Type <span className="text-blue-600">*</span>
            </label>

            {isEdit ? (
              <select id="companyType" className="bg-gray-200 text-gray-800 py-3 px-2 rounded-md my-1" value={payload.companyType} onChange={handleOnChange}>
                {organizationType.map((type) => (
                  <option className="capitalize " value={type.value} key={type.value}>
                    {type.type}
                  </option>
                ))}
              </select>
            ) : (
              <p className={`${payload?.companyType ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.companyType || "—"}
              </p>
            )}
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="companySize" className="text-gray-500 capitalize">
              Company Size <span className="text-blue-600">*</span>
            </label>

            {isEdit ? (
              <select id="companySize" className="bg-gray-200 text-gray-800 py-3 px-2 rounded-md my-1" value={payload.companySize} onChange={handleOnChange}>
                {companySizes.map((size) => (
                  <option className="capitalize " value={size} key={size}>
                    {size}
                  </option>
                ))}
              </select>
            ) : (
              <p className={`${payload?.companySize ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.companySize || "—"}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="country" className="text-gray-500 capitalize">
              Country
            </label>

            {isEdit ? (
              <select onClick={(e) => setCountry(() => e.target.value)} onChange={handleOnChange} id="country" className="bg-gray-200 text-gray-800 py-3 px-2 rounded-md my-1">
                <option value="">Select</option>
                {getCountries.map((cont) => (
                  <option key={cont.name} value={cont.isoCode}>
                    {cont.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className={`${payload?.name ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.name || "—"}
              </p>
            )}
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="state" className="text-gray-500 capitalize">
              State
            </label>

            {isEdit ? (
              <select
                id="state"
                className="bg-gray-200 text-gray-800 py-3 px-2 rounded-md my-1"
                onClick={(e) => setState(() => e.target.value)}
                value={payload?.location?.state}
                onChange={handleOnChange}
              >
                <option value="">Select</option>
                {getStates?.map((state) => (
                  <option key={state.name} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className={`${payload?.location?.state ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.location?.state || "—"}
              </p>
            )}
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="city" className="text-gray-500 capitalize">
              City
            </label>

            {isEdit ? (
              <select
                id="city"
                className="bg-gray-200 text-gray-800 py-3 px-2 rounded-md my-1"
                onClick={(e) => setCity(() => e.target.value)}
                value={payload?.location?.city}
                onChange={handleOnChange}
              >
                <option value="">Select</option>
                {getCities?.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className={`${payload?.location?.city ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.location?.city || "—"}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="contactEmail" className="text-gray-500 capitalize">
              Email
            </label>

            {isEdit ? (
              <input
                id="contactEmail"
                value={payload?.contactEmail}
                onChange={handleOnChange}
                type="text"
                className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                autoComplete="off"
              />
            ) : (
              <p className={`${payload?.contactEmail ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.contactEmail || "—"}
              </p>
            )}
          </div>

          <div className="w-1/2 text-sm flex flex-col row-span-1">
            <label htmlFor="contactPhone" className="text-gray-500 capitalize">
              Phone
            </label>

            {isEdit ? (
              <input
                value={payload?.contactPhone}
                onChange={handleOnChange}
                id="contactPhone"
                type="text"
                className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                autoComplete="off"
              />
            ) : (
              <p className={`${payload?.contactPhone ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.contactPhone || "—"}
              </p>
            )}
          </div>
        </div>

        <hr className="my-5 border-gray-300" />

        <div className="flex gap-x-5">
          <button
            className={`${isEdit ? "bg-orange-600" : "bg-blue-600"} text-white py-2 px-4 rounded ${isEdit ? "hover:bg-orange-700" : "hover:bg-blue-700"} transition flex justify-center gap-2 cursor-pointer`}
            onClick={(e) =>
              setIsEdit((edit) => {
                e.preventDefault();
                return !edit;
              })
            }
          >
            {isEdit ? "Cancel" : "Update"}
          </button>

          {isEdit && (
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer">
              Update Profile {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

export default ManageFoundingInfo;
