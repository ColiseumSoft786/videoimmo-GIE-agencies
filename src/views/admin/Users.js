import React, { useEffect, useState } from "react";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import AddAgencyModal from "views/Modals/AddAgencyModal";
import Loader from "utils/Loader/Loader";
import { getAllAgencies } from "apis/agency";
import { deleteAgency } from "apis/agency";
import toastService from "utils/Toaster/toaster";
import EditAgencyModal from "views/Modals/EditAgencyModal";
import ViewAgencyModal from "views/Modals/ViewAgencyModal";
import { useSelector } from "react-redux";
import { getAllUserByGieId } from "apis/users";
import { getAllUsersByAgencyId } from "apis/users";
import AddUserModal from "views/Modals/AddUserModal";
import { deleteUser } from "apis/users";
import EditUserModal from "views/Modals/EditUserModal";
import ViewUserModal from "views/Modals/ViewUserModal";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";
import { getAllAgenciesNames } from "apis/agency";
import { getAllUserLengthByAgency } from "apis/dashboard";
import { getAllUserLengthByGie } from "apis/dashboard";
import { getsingleuserbygie } from "apis/users";
import ConfirmModal from "views/Modals/ConfirmModal";
import { getAllGieUsernames } from "apis/users";
import { getAllUsersNamesByAgency } from "apis/users";
const Users = () => {
  const color = "light";
  const location = useLocation();
  const { agId, page, userid } = useParams();
  console.log("this is selected agency", agId, page, userid);
  const history = useHistory();
  const isGie = useSelector((state) => state.login.isGie);
  const isAgency = useSelector((state) => state.login.isAgency);
  const gieId = isGie
    ? localStorage.getItem("gie_id")
    : localStorage.getItem("parent_gie");
  const agencyId = isAgency ? localStorage.getItem("agency_id") : "";
  const [isloading, setisloading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [isediting, setisEditing] = useState(false);
  const [isadding, setisadding] = useState(false);
  const [isviewing, setisviewing] = useState(false);
  const [usertoview, setusertoview] = useState(null);
  const [allagencies, setallagencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState("");
  const [currentpage, setcurrentpage] = useState(Number(page));
  const [totalpages, settotalpages] = useState(0);
  const [totalitems, settotalitems] = useState(0);
  const [isconfirm, setisconfirm] = useState(false);
  const [deleteid, setdeleteid] = useState("");
  const [searchText, setSearchText] = useState("");
  const [listitems, setlistitems] = useState([]);
  const [listitemstoshow, setlistitemstoshow] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const handlegetlistitems = async () => {
    setIsFetching(true);
    let items = [];
    if (isGie) {
      items = await getAllGieUsernames(gieId);
    }
    if (isAgency) {
      items = await getAllUsersNamesByAgency(agencyId);
    }
    if (!items.error) {
      setlistitems(items.data);
      setlistitemstoshow(items.data);
      setIsFetching(false);
    }
  };
  const getpages = async () => {
    let pages = null;
    if (isGie) {
      if (agId) {
        pages = await getAllUserLengthByAgency(agId);
      } else {
        pages = await getAllUserLengthByGie(gieId);
      }
    }
    if (isAgency) {
      pages = await getAllUserLengthByAgency(agencyId);
    }
    if (!pages?.error) {
      settotalitems(Number(pages?.data));
      settotalpages(Math.ceil(pages?.data / 20));
    } else {
      settotalitems(0);
      settotalpages(1);
    }
  };
  const handleprev = () => {
    if (currentpage > 1) {
      const prev = currentpage - 1;
      if (isGie) {
        if (agId) {
          history.push(`/users/agency/${selectedAgency}/${prev}`);
        } else {
          history.push(`/users/${prev}`);
        }
      }
      if (isAgency) {
        history.push(`/users/${prev}`);
      }
    }
  };
  const handlenext = () => {
    if (currentpage < totalpages) {
      const next = currentpage + 1;
      if (isGie) {
        if (agId) {
          history.push(`/users/agency/${selectedAgency}/${next}`);
        } else {
          history.push(`/users/${next}`);
        }
      }
      if (isAgency) {
        history.push(`/users/${next}`);
      }
    }
  };
  useEffect(() => {
    setcurrentpage(Number(page));
  }, [page]);
  const handleGetAllUsers = async () => {
    try {
      setisloading(true);
      let response = [];
      const issearched = window.location.pathname.includes("searched");
      if (isGie && !issearched) {
        if (agId) {
          response = await getAllUsersByAgencyId(agId, page);
          if (!response.error) {
            setAllUsers(response.data);
            setisloading(false);
          }
        }
        if (!agId) {
          response = await getAllUserByGieId(gieId, page);
          if (!response.error) {
            setAllUsers(response.data);
            setisloading(false);
          }
        }
      }
      if (isAgency && !issearched) {
        response = await getAllUsersByAgencyId(agencyId, page);
        if (!response.error) {
          setAllUsers(response.data);
          setisloading(false);
        }
      }
      if (issearched) {
        console.log("this is user id ", userid);
        response = await getsingleuserbygie(userid);
        if (!response.error) {
          setAllUsers([response.data]);
          setisloading(false);
        }
      }
    } catch (error) {
      console.log("error in fetching users", error);
    }
  };
  const handleGetAllAgencyNames = async () => {
    const response = await getAllAgenciesNames(gieId);
    if (!response.error) {
      setallagencies(response.data);
    }
  };
  useEffect(() => {
    if (window.location.pathname.includes("users")) {
      console.log("use effect running on refresh ");
      handleGetAllUsers();
      handlegetlistitems();
      getpages();
      if (isGie) {
        handleGetAllAgencyNames();
      }
      if (agId) {
        setSelectedAgency(agId);
      }
    }
  }, [location, isAgency, isGie]);
  const handleeditclick = (user) => {
    setisEditing(true);
    setusertoview(user);
  };
  const handleviewclick = (user) => {
    setisviewing(true);
    setusertoview(user);
  };
  const handledeleteuser = async (id) => {
    const response = await deleteUser(id);
    if (!response.error) {
      toastService.success("User Deleted Successfully");
      handleGetAllUsers();
      setisconfirm(false);
    }
  };
  const handledeleteclick = (id) => {
    setdeleteid(id);
    setisconfirm(true);
  };
  const handlefilterclick = () => {
    if (selectedAgency.trim() !== "") {
      history.push(`/users/agency/${selectedAgency}/1`);
    }
  };
  useEffect(() => {
    setlistitemstoshow(
      listitems.filter((item) =>
        item.fname.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);
  const handlesuggestionclick = (id) => {
    history.push(`/users/searched/${id}`);
    setSearchText("");
  };
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
              (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
            }
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto">
                  <div
                    style={{ margin: "10px" }}
                    className="relative flex w-full flex-wrap items-stretch"
                  >
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Search User"
                      value={searchText}
                      disabled={isFetching}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                    />
                    {searchText.trim() !== "" && (
                      <div
                        style={{
                          backgroundColor: "white",
                          position: "absolute",
                          top: "50px",
                          left: "0",
                          width: "315px",
                          maxHeight: "40vw",
                          overflowY: "scroll",
                          zIndex: 50,
                        }}
                      >
                        {listitemstoshow.map((item, index) => {
                          return (
                            <div
                              onClick={() => handlesuggestionclick(item._id)}
                              style={{
                                padding: "10px",
                                textAlign: "left",
                                cursor: "pointer",
                              }}
                              key={index}
                            >
                              {window.location.pathname.includes("users")
                                ? item.fname
                                : item.name}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </form>
                <div className="relative w-full px-4 max-w-full flex justify-between">
                  <h3
                    className={
                      "font-semibold text-lg " +
                      (color === "light" ? "text-blueGray-700" : "text-white")
                    }
                  >
                    Users
                  </h3>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: isGie ? "space-between" : "end",
                    }}
                  >
                    {isGie && !isAgency && (
                      <div style={{ width: "50%" }}>
                        <select
                          value={selectedAgency}
                          onChange={(e) => setSelectedAgency(e.target.value)}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        >
                          <option value={""}>Select</option>
                          {allagencies.map((agency, index) => {
                            return (
                              <option value={agency._id} key={index}>
                                {agency.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                    {isAgency && !isGie ? (
                      <button
                        className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        onClick={() => setisadding(true)}
                      >
                        Add User
                      </button>
                    ) : (
                      <>
                        <button
                          disabled={selectedAgency === ""}
                          className={`bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ${
                            selectedAgency === ""
                              ? "opacity-50"
                              : "active:bg-blueGray-600"
                          }`}
                          onClick={handlefilterclick}
                        >
                          Filter
                        </button>
                        <button
                          onClick={() => {
                            history.push("/users/1");
                            setSelectedAgency("");
                          }}
                          className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        >
                          Clear Filter
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {isloading ? (
              <div
                className="w-full absolute flex justify-center"
                style={{ top: "200px" }}
              >
                <Loader />
              </div>
            ) : (
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        Sr #
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        Image
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        Full Name
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        Mobile #
                      </th>
                      {isGie && (
                        <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                          }
                        >
                          Agency
                        </th>
                      )}
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        House
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        Manager Of
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        Member Of
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {allUsers.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {index + 1}
                          </td>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            {user.image.trim() === "" ? (
                              <div>
                                <span
                                  style={{ height: "25px", width: "25px" }}
                                  className=" text-sm text-white bg-blueGray-600 inline-flex items-center justify-center rounded-full"
                                >
                                  <i class="fas fa-user"></i>
                                </span>
                              </div>
                            ) : (
                              <img
                                src={`https://api.videorpi.com/${user.image}`}
                                style={{ height: "25px", width: "25px",objectFit:'cover' }}
                                className=" bg-white rounded-full border"
                                alt="..."
                              ></img>
                            )}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.fname}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.country_Code}-{user.mobile_no}
                          </td>
                          {isGie && (
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {user.agency.name}
                            </td>
                          )}
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button
                              onClick={() => {
                                history.push(
                                  `/houses/of/${user._id}/${user.fname}/1`
                                );
                              }}
                              className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            >
                              List Houses
                            </button>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.managerOf.length > 0 && (
                              <span>({user.managerOf.join(" , ")})</span>
                            )}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.memberOf.length > 0 && (
                              <span>({user.memberOf.join(" , ")})</span>
                            )}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <TableDropdown
                              isedit={isAgency}
                              isview={true}
                              isdelete={isAgency}
                              handleedit={() => handleeditclick(user)}
                              handleview={() => handleviewclick(user)}
                              handledelete={() => handledeleteclick(user._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {!isloading &&
            totalitems > 20 &&
            !window.location.pathname.includes("searched") && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <button
                  disabled={currentpage === 1}
                  className={`bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ${
                    currentpage === 1 ? "opacity-50" : "active:bg-blueGray-600"
                  }`}
                  onClick={handleprev}
                >
                  Prev
                </button>
                <div className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  {currentpage}
                </div>
                <button
                  disabled={currentpage === totalpages}
                  className={`bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ${
                    currentpage === totalpages
                      ? "opacity-50"
                      : "active:bg-blueGray-600"
                  }`}
                  onClick={handlenext}
                >
                  next
                </button>
              </div>
            )}
        </div>
      </div>
      {(isadding || isediting || isviewing || isconfirm) && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            paddingTop: "10vh",
            zIndex: 51,
          }}
        >
          {isadding && (
            <AddUserModal
              handleClose={() => setisadding(false)}
              GieId={gieId}
              Agencyid={agencyId}
              handlefetch={handleGetAllUsers}
            />
          )}
          {isediting && (
            <EditUserModal
              handleClose={() => setisEditing(false)}
              usertoedit={usertoview}
              GieId={gieId}
              Agencyid={agencyId}
              handlefetch={handleGetAllUsers}
            />
          )}
          {isviewing && (
            <ViewUserModal
              handleClose={() => setisviewing(false)}
              Usertoview={usertoview}
            />
          )}
          {isconfirm && (
            <ConfirmModal
              handleClose={() => setisconfirm(false)}
              handleAction={() => handledeleteuser(deleteid)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Users;
