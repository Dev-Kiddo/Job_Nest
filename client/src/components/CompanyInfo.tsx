import { ImageUp, MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, registerCompany } from "../features/companySlice";
import useToastMessage from "../hooks/useToastMessage";
import { useNavigate } from "react-router-dom";

function CompanyInfo() {
  const dispatch = useDispatch();
  const { loading, company, error, message, messageType, isMessageShown } = useSelector((state) => state.company);

  // const { loading } = useSelector((state) => state.user);

  const [payload, setPayload] = useState({
    logo: "",
    banner: "",
    name: "",
    description: "",
    tagline: "",
    website: "",
  });

  const navigate = useNavigate();

  const handleFormData = function (event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value, files } = event.target;

    if (id === "logo" || id === "banner") {
      const file = files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.readyState === 2) {
          // console.log(reader.result);
        }
      };

      reader.onerror = (err) => {
        console.log(`Image(${id}) process failed`);
        console.log(err);
      };

      setPayload((payload) => ({ ...payload, [id]: file }));
      return;
    }

    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("logo", payload.logo);
    formData.append("banner", payload.banner);
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("tagline", payload.tagline);
    formData.append("website", payload.website);

    dispatch(registerCompany(formData));
  };

  useToastMessage("company");

  useEffect(() => {
    if (message && messageType === "success" && !isMessageShown) {
      navigate("/create-company/founding-info");
      dispatch(clearMessage());
    }
  }, [message, messageType, isMessageShown, navigate, dispatch]);

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm text-gray-500 row-span-1">
            Upload Logo
            <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded mt-2 p-5 cursor-pointer">
              <label htmlFor="logo" className="text-xs flex flex-col items-center justify-between gap-8 cursor-pointer">
                <ImageUp className="lucide-big" color="#99a1af" />
                {payload.logo !== "" ? (
                  <p className="text-xs text-center text-green-700">
                    <span className="text-xs font-medium text-gray-800 hidden">Choose a file or drag and drop it here</span> <br />
                    File uploaded successfully!
                  </p>
                ) : (
                  <p className="text-xs text-center text-gray-500">
                    <span className="text-xs font-medium text-gray-800">Choose a file or drag and drop it here</span> <br />
                    JPEG, JPG, PNG formats, upto 1MB
                  </p>
                )}
              </label>
              <input type="file" id="logo" onChange={(e) => handleFormData(e)} hidden />
            </div>
          </div>

          <div className="text-sm text-gray-500 col-span-2">
            Banner image
            <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded mt-2 p-5 cursor-pointer">
              <label htmlFor="banner" className="text-xs flex flex-col items-center justify-between gap-8 cursor-pointer">
                <ImageUp className="lucide-big" color="#99a1af" />
                {payload.banner !== "" ? (
                  <p className="text-xs text-center text-green-700">
                    <span className="text-xs font-medium text-gray-800 hidden">Choose a file or drag and drop it here</span> <br />
                    File uploaded successfully!
                  </p>
                ) : (
                  <p className="text-xs text-center text-gray-500">
                    <span className="text-xs font-medium text-gray-800">Choose a file or drag and drop it here</span> <br />
                    JPEG, JPG, PNG formats, upto 1MB
                  </p>
                )}
              </label>
              <input type="file" id="banner" onChange={(e) => handleFormData(e)} hidden />
            </div>
          </div>
        </div>

        <hr className="my-5 border-gray-300" />

        <div className="text-sm flex flex-col mt-4">
          <label className="text-gray-500 capitalize">
            Company Name <span className="text-blue-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
            placeholder="Enter your company name here"
            onChange={(e) => handleFormData(e)}
          />
        </div>

        <div className="text-sm flex flex-col mt-4">
          <label htmlFor="description" className="text-gray-500 capitalize">
            About us
          </label>
          <textarea
            id="description"
            className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
            placeholder="Write down about your company here. Let the candidate know who you are..."
            rows={4}
            onChange={(e) => handleFormData(e)}
          />
        </div>

        <div className="flex gap-4 my-4">
          <div className="w-1/2 text-sm flex flex-col mt-4">
            <label className="text-gray-500 capitalize">Tagline</label>
            <input
              type="text"
              id="tagline"
              onChange={(e) => handleFormData(e)}
              className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
              placeholder="Enter your company name here"
            />
          </div>

          <div className="w-1/2 text-sm flex flex-col mt-4">
            <label className="text-gray-500 capitalize">Website</label>
            <input
              type="text"
              id="website"
              onChange={(e) => handleFormData(e)}
              className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
              placeholder="Enter your company name here"
            />
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
