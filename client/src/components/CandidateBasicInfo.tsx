import { ImageUp } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CandidateBasicInfo() {
  const [birthDate, setBirthDate] = useState(null);
  return (
    <div>
      <h1 className="text-md mb-4 capitalize">Basic information</h1>

      <form>
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <div className="text-sm text-gray-500 row-span-2">
            Profile Picture
            <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded mt-2 p-5 cursor-pointer">
              <label htmlFor="avatar" className="text-xs flex flex-col items-center justify-between gap-8 cursor-pointer">
                <ImageUp className="lucide-big" color="#99a1af" />
                <p className="text-xs text-center text-gray-500">
                  <span className="text-xs font-medium text-gray-800">Choose a file or drag and drop it here</span> <br />
                  JPEG, JPG, PNG formats, upto 1MB
                </p>
              </label>
              <input type="file" id="avatar" hidden />
            </div>
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">phone number</label>
            <input type="text" className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" />
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label className="capitalize text-gray-500">location</label>
            <input type="text" className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" />
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">Gender</label>

            <select className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
              <option value="">Select</option>
              <option value="">M</option>
              <option value="">F</option>
            </select>
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">Date of birth</label>

            <div className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText="Click to select DOB"
                className="bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CandidateBasicInfo;
