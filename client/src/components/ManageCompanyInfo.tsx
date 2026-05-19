import React, { useEffect, useState } from "react";
import { updateCompanyInfo } from "../features/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { ImageUp, MoveRight } from "lucide-react";
import Loader from "./Loader";
import { motion } from "framer-motion";

function ManageCompanyInfo() {
  const { company, loading, messageType, isMessageShown } = useSelector((state) => state.company);

  const dispatch = useDispatch();

  // console.log("COMPANY", company);

  const [isLoading, setIsLoading] = useState(true);

  const [isEdit, setIsEdit] = useState(false);

  const [payload, setPayload] = useState({
    logo: "",
    banner: "",
    name: company?.name || "",
    description: company?.description || "",
    tagline: company?.tagline || "",
    website: company?.website || "",
  });

  // console.log("CHECK", company?.logo?.url);

  // console.log("PAYLoad", payload);

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

    dispatch(updateCompanyInfo({ formData, companyId: company }));
  };

  useEffect(() => {
    if (!loading && messageType === "success") {
      setIsEdit(false);
    }
  }, [loading, messageType]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <motion.div className="w-full" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          {isEdit ? (
            <div className="text-sm text-gray-500">
              Upload Logo
              <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded mt-2 p-5 cursor-pointer">
                <label htmlFor="logo" className="text-xs flex flex-col items-center justify-between gap-4 cursor-pointer">
                  <ImageUp className="lucide-big" color="#99a1af" />

                  {payload?.logo !== "" ? (
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
                <input type="file" id="logo" onChange={handleFormData} hidden />
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 row-span-2 items-center">
              Logo
              <div className="rounded mt-2 relative">
                <div className="mt-2 p-5 bg-gray-200 border-2 border-dashed border-gray-300 rounded flex flex-col justify-center items-center">
                  <img className="w-12 rounded-full mx-auto" src={company?.logo?.url || "/src/assets/img/default-avatar.png"} alt="logo" />
                  <p className="text-xs text-center text-gray-500 mt-4">Company Logo</p>
                </div>
              </div>
            </div>
          )}

          {isEdit ? (
            <div className="text-sm text-gray-500 col-span-2">
              Upload Banner
              <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded mt-2 p-5 cursor-pointer">
                <label htmlFor="banner" className="text-xs flex flex-col items-center justify-between gap-4 cursor-pointer">
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
          ) : (
            <div className="text-sm text-gray-500 row-span-2 col-span-2 items-center">
              Banner
              <div className="mt-2">
                <img style={{ height: "124px" }} className="w-full rounded-md object-cover" src={company?.banner?.url || "/src/assets/img/def-profile-banner.jpg"} alt="banner" />
              </div>
            </div>
          )}
        </div>

        <hr className="my-5 border-gray-300" />

        <div className="text-sm flex flex-col mt-4">
          <label className="text-gray-500 capitalize">
            Company Name <span className="text-red-500">*</span>
          </label>
          {isEdit ? (
            <>
              <input
                type="text"
                id="name"
                required
                className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                value={payload.name}
                placeholder="Enter your company name here"
                onChange={(e) => handleFormData(e)}
                autoComplete="off"
              />
            </>
          ) : (
            <p className={`${payload?.name ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
              {payload?.name || "—"}
            </p>
          )}
        </div>

        <div className="text-sm flex flex-col mt-4">
          <label htmlFor="description" className="text-gray-500 capitalize">
            About us
          </label>
          {isEdit ? (
            <textarea
              id="description"
              className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
              placeholder="Write down about your company here. Let the candidate know who you are..."
              rows={4}
              value={payload.description}
              onChange={(e) => handleFormData(e)}
            />
          ) : (
            <p className={`${payload?.description ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
              {payload?.description || "—"}
            </p>
          )}
        </div>

        <div className="flex gap-4 my-4">
          <div className="w-1/2 text-sm flex flex-col mt-4">
            <label className="text-gray-500 capitalize">Tagline</label>
            {isEdit ? (
              <input
                type="text"
                id="tagline"
                value={payload.tagline}
                onChange={(e) => handleFormData(e)}
                className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                placeholder="Enter your company tagline here"
                autoComplete="off"
              />
            ) : (
              <p className={`${payload?.tagline ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.tagline || "—"}
              </p>
            )}
          </div>

          <div className="w-1/2 text-sm flex flex-col mt-4">
            <label className="text-gray-500 capitalize">Website</label>
            {isEdit ? (
              <input
                type="text"
                id="website"
                value={payload?.website}
                onChange={(e) => handleFormData(e)}
                className="py-3 px-4 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                placeholder="Enter your company website here"
                autoComplete="off"
              />
            ) : (
              <p className={`${payload?.website ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.website || "—"}
              </p>
            )}
          </div>
        </div>

        {/* <button type="submit" className="bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
          Save & Next {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
        </button> */}

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

export default ManageCompanyInfo;
