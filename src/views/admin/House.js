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
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllUserHouses } from "apis/houses";
import { getAllHousesByAgency } from "apis/houses";
import { deleteHouseByAgency } from "apis/houses";
import ViewHouseModal from "views/Modals/ViewHouseModal";
import { getHousesByGie } from "apis/houses";
import { getAllAgenciesNames } from "apis/agency";

const House = () => {
  const color = "light";
  const history = useHistory()
  const location = useLocation()
  const { userid, username } = useParams();
  const {agId} = useParams()
  const isGie = useSelector((state) => state.login.isGie);
  const isAgency = useSelector((state) => state.login.isAgency);
  const gieId = isGie
    ? localStorage.getItem("gie_id")
    : localStorage.getItem("parent_gie");
  const agencyId = isAgency ? localStorage.getItem("agency_id") : "";
  const [isloading, setisloading] = useState(true);
  const [allHouses, setAllHouses] = useState([]);
  const [isviewing, setisviewing] = useState(false);
  const [housetoview, sethousetoview] = useState(null);
  const [selectedAgency, setSelectedAgency] = useState("");
    const [allagencies, setallagencies] = useState([]);
  const handleGetAllHouses = async () => {
    try {
      let response = {};
      setisloading(true);
      if (window.location.pathname==='/houses') {
        if(isGie){
          if(agId){
            response = await getAllHousesByAgency(agId)
          }else{
            response = await getHousesByGie(gieId);
          }
          
        }
        if(isAgency){
          response = await getAllHousesByAgency(agencyId);
        }
      } else {
        response = await getAllUserHouses(userid);
      }
      if (!response.error) {
        setAllHouses(response.data);
        setisloading(false);
      }
    } catch (error) {
      console.log("error in fetching houses", error);
    }
  };
  const handleGetAllAgencyNames = async () => {
      const response = await getAllAgenciesNames(gieId);
      if (!response.error) {
        setallagencies(response.data);
      }
    };
  useEffect(() => {
    if(window.location.pathname.includes('houses')){
    if(isGie){
      handleGetAllAgencyNames()
    }
    handleGetAllHouses();
  }
  }, [location]);
  const handledeleteclick = async (id) => {
    const response = await deleteHouseByAgency(id);
    if (!response.error) {
      toastService.success("House Deleted Successfully");
      handleGetAllHouses();
    }
  };
  const getHouseTimestamp = (createdAt) => {
    return new Date(createdAt).getTime(); // or .valueOf()
  };
  const handleViewClick = (house) => {
    sethousetoview(house);
    setisviewing(true);
  };
  const handlefilterclick = () => {
    if (selectedAgency.trim() !== "") {
      history.push(`/houses/${selectedAgency}`);
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
                    {window.location.pathname==='/houses' ? "Houses" : `Houses of ${username}`}
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
                    {isGie &&(
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
                            history.push("/houses");
                            setSelectedAgency('')
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
                        Thumbnail
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        Type
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        House Type
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        User Name
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        View House
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        Status
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
                    {allHouses.map((house, index) => {
                      return (
                        <tr key={index}>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {index + 1}
                          </td>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            <div
                              style={{
                                height: "60px",
                                width: "60px",
                                overflow: "hidden",
                                alignItems: "center",
                                alignContent: "center",
                              }}
                            >
                              {house.thumbnail !== "" && (
                                <img
                                  style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                  }}
                                  src={`https://api.videorpi.com/${house.thumbnail}`}
                                />
                              )}
                            </div>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {house.type}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {house.houseType}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {house.user.fname}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <a
                              href={`https://web.videorpi.com/v/${getHouseTimestamp(
                                house.createdAt
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i
                              style={{
                                fontSize: "20px",
                                color: house.status === 1 ? "green" : "red",
                              }}
                              className={`${
                                house.status === 1
                                  ? "fas fa-check"
                                  : "fas fa-xmark"
                              }`}
                            />
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <TableDropdown
                              isedit={false}
                              isview={true}
                              isdelete={true}
                              handledelete={() => handledeleteclick(house._id)}
                              handleview={handleViewClick(house)}
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
      {isviewing && (
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
          {isviewing && (
            <ViewHouseModal
              handleClose={() => setisviewing(false)}
              Housetoview={housetoview}
            />
          )}
        </div>
      )}
    </>
  );
};

export default House;
