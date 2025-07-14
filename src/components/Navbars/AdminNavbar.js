import React, { useEffect, useState } from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { useDispatch, useSelector } from "react-redux";
import { setsearchtext } from "utils/ReduxSlices/LoginSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.login.searchText);
  const isGie = useSelector((state) => state.login.isGie);
  const [isexpired,setisexpired] = useState(false)
  const expiry = localStorage.getItem("expiry");
  const giename = localStorage.getItem("giename");
  const agencyname = localStorage.getItem("agencyname");
  const [userName, setUserName] = useState("");
  const handlechangesearchtext = (text) => {
    dispatch(setsearchtext(text));
  };
  useEffect(() => {
    setUserName(giename ? giename : agencyname);
  }, [giename, agencyname]);
  useEffect(()=>{
    if(expiry>=new Date){
      setisexpired(true)
    }
  },[])
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a style={{marginRight:'20px'}} className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
            {userName}
          </a>
          {isGie && (
            <a className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
             { isexpired?'Expired':`Expires On : ${expiry.slice(0, 10)}`}
            </a>
          )}
          {/* Form */}
          {!window.location.pathname.includes("houses") &&
            !window.location.pathname.includes("settings") &&
            !window.location.pathname.includes("dashboard") && (
              <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                <div className="relative flex w-full flex-wrap items-stretch">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Search here..."
                    value={searchText}
                    onChange={(e) => handlechangesearchtext(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                  />
                </div>
              </form>
            )}
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
