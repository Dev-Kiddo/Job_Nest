import React, { useEffect, useState } from "react";
import { updateCandidateProfile } from "../features/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircleX, MoveRight } from "lucide-react";
import Loader from "./Loader";
import useToastMessage from "../hooks/useToastMessage";

function CandidateSocialInfo() {
  const { candidate, loading, messageType } = useSelector((state) => state.profile);

  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const [links, setLinks] = useState([
    { name: "portfolio", baseUrl: candidate?.socialLinks.find((el) => el.name === "portfolio")?.baseUrl || "" },
    { name: "linkedin", baseUrl: candidate?.socialLinks.find((el) => el.name === "linkedin")?.baseUrl || "" },
    { name: "github", baseUrl: candidate?.socialLinks.find((el) => el.name === "github")?.baseUrl || "" },
    { name: "twitter", baseUrl: candidate?.socialLinks.find((el) => el.name === "twitter")?.baseUrl || "" },
  ]);

  const handleOnChangeLinks = function (event) {
    const { id, value } = event.target;

    setLinks((links) => links.map((li) => (li.name === id ? { ...li, baseUrl: value } : { ...li })));
  };

  const handleSubmit = function (event) {
    event.preventDefault();

    const linksCopy = [...links];

    const filterPayload = linksCopy.filter((link) => link.baseUrl !== "");

    const payload = {
      socialLinks: filterPayload,
    };

    dispatch(updateCandidateProfile(payload));
  };

  useEffect(() => {
    if ((!loading, messageType === "success")) {
      setIsEdit(false);
    }
  }, [loading, messageType]);

  useToastMessage("profile");

  // const handleDelete = function (name) {
  //   console.log("name", name);
  //   setLinks((link) => link.filter((li) => li !== name));

  // };

  return (
    <div className="w-full">
      <h1 className="text-md mb-4 capitalize">Social Information</h1>
      <form onSubmit={handleSubmit}>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="w-full flex items-center justify-between gap-x-4">
            <div className="text-sm my-4 flex flex-1 items-center justify-between gap-2 bg-gray-200">
              <div className="">
                <select value={links[index].name} className="py-3 px-14 capitalize font-medium text-gray-800 bg-gray-200 focus:outline-none" disabled={isEdit ? false : true}>
                  {links.map((link) => (
                    <option key={link.name} value={link.name}>
                      {link.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-0.5 h-7 bg-gray-300"></div>

              <div className="flex-1">
                <label className="text-gray-500 capitalize hidden">Social link 1</label>
                <input
                  type="text"
                  id={links[index].name}
                  className="w-full py-3 px-4 text-sm bg-gray-200 rounded-md focus:outline-none"
                  placeholder="Profile link/url..."
                  disabled={isEdit ? false : true}
                  value={links[index].baseUrl}
                  onChange={handleOnChangeLinks}
                  autoComplete="off"
                />
              </div>
            </div>

            {isEdit && (
              <button type="submit" className="bg-red-500 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer">
                <CircleX color="#fff" />
              </button>
            )}
          </div>
        ))}

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
    </div>
  );
}

export default CandidateSocialInfo;
