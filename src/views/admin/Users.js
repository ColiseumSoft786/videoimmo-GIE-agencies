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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Users = () => {
  const color = "light";
  const history = useHistory()
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
  const handleGetAllUsers = async () => {
    try {
      setisloading(true);
      let response = [];
      if (isGie) {
        response = await getAllUserByGieId(gieId);
        if (!response.error) {
          setAllUsers(response.data);
          setisloading(false);
        }
      }
      if (isAgency) {
        response = await getAllUsersByAgencyId(agencyId);
        if (!response.error) {
          setAllUsers(response.data);
          setisloading(false);
        }
      }
    } catch (error) {
      console.log('error in fetching users',error)
    }
  };
  useEffect(() => {
    handleGetAllUsers();
  }, []);
  const handleeditclick = (user) => {
    setisEditing(true);
    setusertoview(user);
  };
  const handleviewclick = (user) => {
    setisviewing(true);
    setusertoview(user);
  };
  const handledeleteclick = async(id) => {
    const response = await deleteUser(id)
    if(!response.error){
      toastService.success('User Deleted Successfully')
      handleGetAllUsers()
    }
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
                      width: "40%",
                      display: "flex",
                      justifyContent: isGie ? "space-between" : "end",
                    }}
                  >
                    {isGie && !isAgency && (
                      <div style={{ width: "60%" }}>
                        <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                          <option value="hello">Hello</option>
                        </select>
                      </div>
                    )}
                    {isAgency && !isGie && (
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                        onClick={() => setisadding(true)}
                      >
                        Add User
                      </button>
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
                            {user.user.image.trim() === "" ? (
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
                                src={`https://api.videorpi.com/${user.user.image}`}
                                style={{ height: "25px", width: "25px" }}
                                className=" bg-white rounded-full border"
                                alt="..."
                              ></img>
                            )}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.user.fname}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.user.country_Code}-{user.user.mobile_no}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button 
                            onClick={()=>{history.push(`/houses/${user.user._id}/${user.user.fname}`)}}
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            >
                              List Houses
                            </button>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <TableDropdown
                              isedit={true}
                              isview={true}
                              isdelete={true}
                              handleedit={() => handleeditclick(user.user)}
                              handleview={() => handleviewclick(user.user)}
                              handledelete={() =>
                                handledeleteclick(user.user._id)
                              }
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
        </div>
      </div>
      {(isadding || isediting || isviewing) && (
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
          {isediting&&(
            <EditUserModal
            handleClose={()=>setisEditing(false)}
            usertoedit={usertoview}
            GieId={gieId}
            Agencyid={agencyId}
            handlefetch={handleGetAllUsers}
            />
          )}
          {isviewing&&(
            <ViewUserModal
            handleClose={()=>setisviewing(false)} 
            Usertoview={usertoview}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Users;
