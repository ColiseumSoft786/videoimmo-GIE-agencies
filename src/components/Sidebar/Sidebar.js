/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { useSelector } from "react-redux";
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const isGie = useSelector((state)=>state.login.isGie)
  const isAgency = useSelector((state)=>state.login.isAgency)
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="flex items-center gap-2 text-left md:pb-2 text-blueGray-600 mr-0  whitespace-nowrap text-sm  font-bold p-4 px-0"
            to="/"
          >
            <img
              src="/images/pokimmo-applogo.png"
              className="h-12 w-12"
              alt="..."
            />
            <span className="text-2xl">VideoIMMO</span>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm  font-bold p-4 px-0"
                    to="/"
                  ></Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            {/* <h6 className="md:min-w-full text-blueGray-500 text-xs  font-bold block pt-1 pb-4 no-underline">
              Admin Layout Pages
            </h6> */}
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs  py-3 font-bold block " +
                    (window.location.href.indexOf("/dashboard") !== -1
                      ? "text-red-600 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/dashboard"
                >
                  <div style={{width:'30%',display:'flex',justifyContent:'space-between'}}>
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/dashboard") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  <span style={{textAlign:'left',width:'60%'}}>Dashboard</span>
                  </div>
                </Link>
              </li>

              {/* <li className="items-center">
                <Link
                  className={
                    "text-xs  py-3 font-bold block " +
                    (window.location.href.indexOf("/tables") !== -1
                      ? "text-red-600 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/tables"
                >
                  <i
                    className={
                      "fas fa-table mr-2 text-sm " +
                      (window.location.href.indexOf("/tables") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  Tables
                </Link>
              </li> */}
              <li className="items-center">
                <Link
                  className={
                    "text-xs  py-3 font-bold block " +
                    (window.location.href.indexOf("/users") !== -1
                      ? "text-red-600 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/users/1"
                >
                  <div style={{width:'30%',display:'flex',justifyContent:'space-between'}}>
                  <i
                    className={
                      "fas fa-user mr-2 text-sm " +
                      (window.location.href.indexOf("/users") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  <span style={{textAlign:'left',width:'60%'}}>Users</span>
                  </div>
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs  py-3 font-bold block " +
                    (window.location.href.indexOf("/teams") !== -1
                      ? "text-red-600 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/teams/1"
                >
                  <div style={{width:'30%',display:'flex',justifyContent:'space-between'}}>
                  <i
                    className={
                      "fas fa-users mr-2 text-sm " +
                      (window.location.href.indexOf("/teams") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  <span style={{textAlign:'left',width:'60%'}}>Teams</span>
                  </div>
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs  py-3 font-bold block " +
                    (window.location.href.indexOf("/houses") !== -1
                      ? "text-red-600 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/houses/1"
                >
                  <div style={{width:'30%',display:'flex',justifyContent:'space-between'}}>
                  <i
                    className={
                      "fas fa-home mr-2 text-sm " +
                      (window.location.href.indexOf("/house") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  <span style={{textAlign:'left',width:'60%'}}>Houses</span>
                  </div>
                </Link>
              </li>
              {isGie&&!isAgency&&<li className="items-center">
                <Link
                  className={
                    "text-xs  py-3 font-bold block " +
                    (window.location.href.indexOf("/agencies") !== -1
                      ? "text-red-600 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/agencies/1"
                >
                  <div style={{width:'30%',display:'flex',justifyContent:'space-between'}}>
                  <i
                    className={
                      "fas fa-sitemap mr-2 text-sm " +
                      (window.location.href.indexOf("/agencies") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  <span style={{textAlign:'left',width:'60%'}}>Agencies</span>
                  </div>
                </Link>
              </li>}
              <li className="items-center">
                <Link
                  className={
                    "text-xs  py-3 font-bold block " +
                    (window.location.href.indexOf("/settings") !== -1
                      ? "text-red-600 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/settings"
                >
                  <div style={{width:'30%',display:'flex',justifyContent:'space-between'}}>
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (window.location.href.indexOf("/settings") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  <span style={{textAlign:'left',width:'60%'}}>Settings</span>
                  </div>
                </Link>
              </li>
              {/* <li className="items-center">
                <Link
                  className={
                    "text-xs  py-3 font-bold block " +
                    (window.location.href.indexOf("/maps") !== -1
                      ? "text-red-600 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/maps"
                >
                  <i
                    className={
                      "fas fa-map-marked mr-2 text-sm " +
                      (window.location.href.indexOf("/maps") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>
                  Maps
                </Link>
              </li> */}
            </ul>
            {/* <hr className="my-4 md:min-w-full" />
            <h6 className="md:min-w-full text-blueGray-500 text-xs  font-bold block pt-1 pb-4 no-underline">
              Auth Layout Pages
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs  py-3 font-bold block"
                  to="/auth/login"
                >
                  <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>
                  Login
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs  py-3 font-bold block"
                  to="/auth/register"
                >
                  <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>
                  Register
                </Link>
              </li>
            </ul> */}

            {/* <hr className="my-4 md:min-w-full" />
            <h6 className="md:min-w-full text-blueGray-500 text-xs  font-bold block pt-1 pb-4 no-underline">
              No Layout Pages
            </h6>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs  py-3 font-bold block"
                  to="/landing"
                >
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>
                  Landing Page
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs  py-3 font-bold block"
                  to="/profile"
                >
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>
                  Profile Page
                </Link>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}
