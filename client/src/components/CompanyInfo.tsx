import { ImageUp, MoveRight } from "lucide-react";
import React from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";

function CompanyInfo() {
  const { loading } = useSelector((state) => state.user);

  return (
    <div className="max-w-6xl mx-auto">
      <form>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm text-gray-500 row-span-1">
            Upload Logo
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

          <div className="text-sm text-gray-500 col-span-2">
            Banner image
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
        </div>

        <hr className="my-5 border-gray-300" />

        <div className="text-sm flex flex-col mt-4">
          <label className="text-gray-500 capitalize">Company Name</label>
          <input type="text" className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" placeholder="Enter your company name here" />
        </div>

        <div className="text-sm flex flex-col mt-4">
          <label htmlFor="about-company" className="text-gray-500 capitalize">
            About us
          </label>
          <textarea
            id="about-company"
            className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
            placeholder="Write down about your company here. Let the candidate know who you are..."
            rows={4}
          />
        </div>

        <div className="flex gap-4 my-4">
          <div className="w-1/2 text-sm flex flex-col mt-4">
            <label className="text-gray-500 capitalize">Tagline</label>
            <input type="text" className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" placeholder="Enter your company name here" />
          </div>

          <div className="w-1/2 text-sm flex flex-col mt-4">
            <label className="text-gray-500 capitalize">Website</label>
            <input type="text" className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500" placeholder="Enter your company name here" />
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
          Save & Next {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
        </button>
      </form>
    </div>
  );
}

export default CompanyInfo;
