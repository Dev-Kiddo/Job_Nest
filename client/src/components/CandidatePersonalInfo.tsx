import { Files, ImageUp, MoveRight, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateCandidateProfile } from "../features/profileSlice";

function CandidatePersonalInfo() {
  const dispatch = useDispatch();

  const { candidate, loading, messageType } = useSelector((state) => state.profile);

  const [isEdit, setIsEdit] = useState(false);

  const [payload, setPayload] = useState({
    fullName: candidate?.fullName || "",
    avatar: "",
    banner: "",
    headline: candidate?.headline || "",
    totalExperience: candidate?.totalExperience || "",
    phone: candidate?.phone || "",
    location: candidate?.location?.country || "",
    gender: candidate?.gender || "",
    dateOfBirth: candidate?.dateOfBirth || "",
    resume: "",
  });

  const handleFormData = function (event: React.ChangeEvent<HTMLInputElement>) {
    const { id, files, value } = event.target;

    if (id === "avatar" || id === "banner" || id === "resume") {
      const file = files[0];

      setPayload((payload) => ({ ...payload, [id]: file }));

      return;
    }

    setPayload((payload) => ({ ...payload, [id]: value }));
  };

  const handleSubmitHandler = function (e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", payload.fullName);
    formData.append("avatar", payload.avatar);
    formData.append("banner", payload.banner);
    formData.append("headline", payload.headline);
    formData.append("totalExperience", payload.totalExperience);
    formData.append("phone", payload.phone);
    formData.append("location", payload.location);
    formData.append("gender", payload.gender);
    formData.append("dateOfBirth", payload.dateOfBirth);
    formData.append("resume", payload.resume);

    dispatch(updateCandidateProfile(formData));
  };

  useEffect(() => {
    if (!loading && messageType === "success") {
      setIsEdit(false);
    }
  }, [loading, messageType]);

  return (
    <div>
      <h1 className="text-md mb-4 capitalize">Basic information</h1>

      <form onSubmit={handleSubmitHandler}>
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          {isEdit ? (
            <div className="text-sm text-gray-500 row-span-2">
              Upload Avatar
              <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded mt-2 p-5 cursor-pointer">
                <label htmlFor="avatar" className="text-xs flex flex-col items-center justify-between gap-4 cursor-pointer">
                  <ImageUp className="lucide-big" color="#99a1af" />

                  {payload?.avatar !== "" ? (
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
                <input type="file" id="avatar" onChange={handleFormData} hidden />
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              Avatar
              <div className="rounded mt-2 relative">
                <div className="mt-2 p-5 bg-gray-200 border-2 border-dashed border-gray-300 rounded flex flex-col justify-center items-center">
                  {/* <Files className="lucide-big" color="#99a1af" /> */}
                  <img className="w-12 rounded-full mx-auto" src={candidate?.avatar?.url || "/src/assets/img/default-avatar.png"} alt="avatar" />
                  <p className="text-xs text-center text-gray-500 mt-4">Profile picture</p>
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
                <img style={{ height: "124px" }} className="w-full rounded-md object-cover" src={candidate?.banner?.url || "/src/assets/img/def-profile-banner.jpg"} alt="avatar" />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
          <div className="text-sm flex flex-col row-span-1">
            <label htmlFor="fullName" className="text-gray-500 capitalize">
              full name
            </label>
            {isEdit ? (
              <input
                type="text"
                id="fullName"
                className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                value={payload.fullName}
                onChange={handleFormData}
              />
            ) : (
              <p className={`${candidate?.fullName ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.fullName || "-"}
              </p>
            )}
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label htmlFor="totalExperience" className="capitalize text-gray-500">
              Total Years of experiance
            </label>

            {isEdit ? (
              <input
                type="text"
                id="totalExperience"
                className="py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                value={payload.totalExperience}
                onChange={handleFormData}
              />
            ) : (
              <p className={`${payload?.totalExperience ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.totalExperience || "—"}
              </p>
            )}
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label htmlFor="headline" className="text-gray-500 capitalize">
              Profile Headline
            </label>

            {isEdit ? (
              <input
                type="text"
                id="headline"
                className="w-full py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                value={payload.headline}
                onChange={handleFormData}
              />
            ) : (
              <p className={`${payload?.headline ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                {payload?.headline || "—"}
              </p>
            )}
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize" htmlFor="location">
              Country
            </label>

            <div className="text-sm rounded-md focus-visible:outline-gray-500">
              {isEdit ? (
                <input
                  type="text"
                  id="location"
                  value={payload.location}
                  className="w-full py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500"
                  onChange={handleFormData}
                />
              ) : (
                <p className={`${payload?.location ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                  {payload?.location || "—"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 items-end gap-4">
          <div className="mt-6">
            <div className="text-sm text-gray-500 col-span-2">
              Resume
              {!isEdit && !candidate?.resumeUrl?.fileName && (
                <div className="mt-2 p-5 bg-gray-200 border-2 border-dashed border-gray-300 rounded flex flex-col justify-center items-center">
                  <Files className="lucide-big" color="#99a1af" />
                  <p className="text-xs text-center text-gray-500 mt-4">Please attach your resume to proceed</p>
                </div>
              )}
              {!isEdit && candidate?.resumeUrl?.fileName && (
                <div className="mt-2 p-5 cursor-pointer bg-gray-200 border-2 border-dashed border-gray-300 rounded flex flex-col justify-center items-center">
                  <Files className="lucide-big" color="#99a1af" />
                  <p className="text-xs text-center text-gray-500 mt-4">
                    <span className="text-xs font-medium text-gray-800">{candidate?.resumeUrl?.fileName}</span>
                  </p>
                </div>
              )}
              {isEdit && (
                <div className="mt-2 p-5 cursor-pointer bg-gray-200 border-2 border-dashed border-gray-300 rounded">
                  <label htmlFor="resume" className="text-xs flex flex-col items-center justify-between gap-4 cursor-pointer">
                    <Files className="lucide-big" color="#99a1af" />
                    {payload.resume !== "" ? (
                      <p className="text-xs text-center text-green-700">
                        <span className="text-xs font-medium text-gray-800 hidden">Choose a file or drag and drop it here</span> <br />
                        File uploaded successfully!
                      </p>
                    ) : (
                      <p className="text-xs text-center text-gray-500">
                        <span className="text-xs font-medium text-gray-800">Click to upload or Drop your resume here</span> <br />
                        Acceptable file types: PDF, DOCX (3MB max)
                      </p>
                    )}
                  </label>
                  <input type="file" id="resume" onChange={handleFormData} accept=".pdf, application/pdf" hidden />
                </div>
              )}
            </div>
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize" htmlFor="dateOfBirth">
              Date of birth
            </label>

            <div className="text-sm mt-2  px-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
              {isEdit ? (
                <DatePicker
                  selected={payload.dateOfBirth}
                  onChange={(date) => setPayload((payload) => ({ ...payload, dateOfBirth: date }))}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  placeholderText="Select Date of Birth"
                  className="w-full bg-transparent focus:outline-none text-md cursor-pointer"
                />
              ) : (
                <p className={`${payload?.dateOfBirth ? "text-gray-900" : "text-gray-500"} py-3 px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                  {payload?.dateOfBirth?.split("T")[0] || "—"}
                </p>
              )}
            </div>
          </div>

          <div className="text-sm flex flex-col row-span-1">
            <label className="text-gray-500 capitalize" htmlFor="gender">
              Gender
            </label>

            <div className="text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500">
              {isEdit ? (
                <select id="gender" className="w-full py-3 px-2 text-md mt-2.5 bg-gray-200 rounded-md focus-visible:outline-gray-500" onChange={handleFormData}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <p className={`${payload?.gender ? "text-gray-900" : "text-gray-500"} py-3 capitalize px-2 text-sm mt-2 bg-gray-200 rounded-md focus-visible:outline-gray-500`}>
                  {payload?.gender || "—"}
                </p>
              )}
            </div>
          </div>
        </div>

        <hr className="my-5 border-gray-300" />

        <div className="flex gap-x-5">
          <button
            className={`${isEdit ? "bg-orange-600" : "bg-blue-600"} text-white py-3 px-4 rounded ${isEdit ? "hover:bg-orange-700" : "hover:bg-blue-700"} transition flex justify-center gap-2 cursor-pointer`}
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
            <button type="submit" className="bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer">
              Update Profile {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CandidatePersonalInfo;
