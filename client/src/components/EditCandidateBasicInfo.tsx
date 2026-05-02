import { Files, ImageUp } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";

function EditCandidateBasicInfo() {
  const dispatch = useDispatch();

  const { candidate } = useSelector((state) => state.candidate);

  const [payload, setPayload] = useState({
    avatar: "",
    phone: "",
    location: "",
    gender: "",
    dataOfBirth: "",
    resume: "",
  });

  const onChangeHandler = function (event) {
    const { id, files, value } = event.target;

    if (id === "avatar" || id === "resume") {
      const file = files[0];
      // console.log("FILE", file);
      setPayload((payload) => ({ ...payload, [id]: file }));
      return;
    }

    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const onSubmitHandler = function (event) {
    event.preventDefault();

    dispatch();
  };

  return (
    <div>
      <h1 className="text-md mb-4 capitalize">Basic information</h1>

      <form onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <div className="text-sm text-gray-500 row-span-2">
            Profile Picture
            <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded mt-2 p-5 cursor-pointer">
              <label htmlFor="avatar" className="text-xs flex flex-col items-center justify-between gap-5 cursor-pointer">
                <ImageUp className="lucide-big" color="#99a1af" />
                <p className="text-xs text-center text-gray-500">
                  <span className="text-xs font-medium text-gray-800">Choose a file or drag and drop it here</span> <br />
                  JPEG, JPG, PNG formats, upto 1MB
                </p>
              </label>
              <input type="file" id="avatar" onChange={onChangeHandler} hidden />
            </div>
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label htmlFor="phone" className="text-gray-500 capitalize">
              phone number
            </label>
            <input type="text" id="phone" className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" onChange={onChangeHandler} />
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label htmlFor="location" className="capitalize text-gray-500">
              location
            </label>
            <input type="text" id="location" className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" onChange={onChangeHandler} />
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label htmlFor="gender" className="text-gray-500 capitalize">
              Gender
            </label>

            <select className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" onChange={onChangeHandler} id="gender">
              <option value="">Select</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize">Date of birth</label>

            <div className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
              <DatePicker
                selected={payload.dataOfBirth}
                onChange={(date) => setPayload((payload) => ({ ...payload, dataOfBirth: date }))}
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

        <div className="text-gray-500 capitalize text-sm mt-6">
          Upload your resume
          <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded mt-2 p-5 cursor-pointer">
            <label htmlFor="resume" className="text-xs flex flex-col items-center justify-between gap-8 cursor-pointer">
              <Files className="lucide-big" color="#99a1af" />
              <p className="text-xs text-center text-gray-500">
                <span className="text-xs font-medium text-gray-800">Drag your resume here or Click to upload</span> <br />
                Acceptable file types: PDF, DOCX (5MB max)
              </p>
            </label>
            <input type="file" id="resume" accept=".pdf, application/pdf" onChange={onChangeHandler} hidden />
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" className="bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
            Save & Next
            {/* Save & Next {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />} */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCandidateBasicInfo;
