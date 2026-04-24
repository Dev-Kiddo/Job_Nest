import { CirclePlus, CircleX, Heading1, Logs, MoveRight } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const linksList = ["facebook", "instagram", "youtube", "linkedin", "behance", "twitter"];

function CompanySocialMediaLinks() {
  const { company, loading, message, messageType, isMessageShown } = useSelector((state) => state.company);

  // const [links, setLinks] = useState(linksList);
  const [links, setLinks] = useState(() => {
    return linksList.map((el) => ({ name: el, baseUrl: "" }));
  });

  // console.log("LINKS", links);

  const [listLength, setListLength] = useState(4);

  const [payload, setPayload] = useState({});

  const handleAddNewSocialLink = function (e) {
    e.preventDefault();
    setListLength((length) => (length >= links.length ? length : length + 1));
  };

  const handleOnChangeLinks = function (event) {
    // console.log("EVENT", event);

    const { id, value } = event.target;

    // console.log("ID, VAL", id, value);

    setLinks((links) => links.map((link) => (link.name === id ? { ...link, baseUrl: value } : link)));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form>
        {Array.from({ length: listLength }, (_, index) => (
          <div key={index} className="w-full flex items-center justify-between gap-x-4">
            <div className="text-sm my-4 flex flex-1 items-center justify-between gap-2 bg-gray-200">
              <div className="">
                {/* <select className="py-3 px-14 capitalize font-medium text-gray-800 bg-gray-200 focus:outline-none"> */}
                {/* <option>Select Link</option> */}
                {/* {links.map((link, index) => (
                    <option id={link.name} key={link.name} value={link.name}>
                      {`${link.name} ${index}`}
                    </option>
                  ))} */}
                {/* </select> */}

                <select
                  value={links[index].name}
                  disabled={true}
                  onChange={(e) => handleSelectChange(e, index)}
                  className="py-3 px-14 capitalize font-medium text-gray-800 bg-gray-200 focus:outline-none"
                >
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
                  required
                  className="w-full py-3 px-4 text-sm bg-gray-200 rounded-md focus:outline-none"
                  placeholder="Profile link/url..."
                  autoComplete="off"
                  onChange={handleOnChangeLinks}
                />
              </div>
            </div>

            <button type="submit" className="bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
              <CircleX color="#fff" />
            </button>
          </div>
        ))}
      </form>

      <button
        type="submit"
        className="w-full bg-gray-200 text-gray-700 text-sm font-medium py-3 px-4 rounded hover:bg-gray-300 transition flex justify-center items-center gap-x-2 cursor-pointer"
        onClick={handleAddNewSocialLink}
      >
        <CirclePlus color="gray" /> Add New Social Link
      </button>

      <hr className="my-5 border-gray-300" />

      <div className="flex mt-6 gap-4">
        <Link
          to="/create-company/company-info"
          type="submit"
          className="border-2 border-gray-300 text-gray-500 py-3 px-4 rounded hover:bg-gray-300 transition flex justify-center items-center gap-2 cursor-pointer "
        >
          Previous
        </Link>
        <button type="submit" className="bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2 cursor-pointer ">
          Save & Next {loading ? <Loader size="4" margin="2" /> : <MoveRight color="#fff" />}
        </button>
      </div>
    </div>
  );
}

export default CompanySocialMediaLinks;
