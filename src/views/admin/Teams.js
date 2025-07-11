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
import { getAllTeams } from "apis/teams";
import AddTeamModal from "views/Modals/AddTeamModal";
import EditTeamModal from "views/Modals/EditTeamModal";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { deleteTeamByAgency } from "apis/teams";
import { getAllGieTeams } from "apis/teams";
import { getAllAgenciesNames } from "apis/agency";
const Teams = () => {
  const color = "light";
  const location = useLocation()
  const { agId } = useParams();
  const history = useHistory();
  const isGie = useSelector((state) => state.login.isGie);
  const isAgency = useSelector((state) => state.login.isAgency);
  const searchText = useSelector((state) => state.login.searchText);
  const gieId = isGie
    ? localStorage.getItem("gie_id")
    : localStorage.getItem("parent_gie");
  const agencyId = isAgency ? localStorage.getItem("agency_id") : "";
  const [isloading, setisloading] = useState(true);
  const [allTeams, setAllTeams] = useState([]);
  const [teamsToList, setTeamsToList] = useState([]);
  const [isadding, setisadding] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState("");
  const [allagencies, setallagencies] = useState([]);
  const handleGetAllteams = async () => {
    try {
      setisloading(true);
      let response = {};
      if (isGie) {
        if (agId) {
          response = await getAllTeams(agId);
          if (!response.error) {
            setAllTeams(response.data);
            setTeamsToList(response.data);
            setisloading(false);
          }
        } else {
          response = await getAllGieTeams(gieId);
          if (!response.error) {
            setAllTeams(response.data);
            setTeamsToList(response.data);
            setisloading(false);
          }
        }
      }
      if (isAgency) {
        response = await getAllTeams(agencyId);
        if (!response.error) {
          setAllTeams(response.data);
          setTeamsToList(response.data);
          setisloading(false);
        }
      }
    } catch (error) {
      console.log("error in fetching teams", error);
    }
  };
  const handleGetAllAgencyNames = async () => {
    const response = await getAllAgenciesNames(gieId);
    if (!response.error) {
      setallagencies(response.data);
    }
  };
  useEffect(() => {
    if(window.location.pathname.includes('teams')){
    handleGetAllteams();
    if (isGie) {
      handleGetAllAgencyNames();
    }}
  }, [location]);
  const handledeleteclick = async (id) => {
    const response = await deleteTeamByAgency(id);
    if (!response.error) {
      toastService.success("Team Deleted Successfully");
      handleGetAllteams();
    }
  };
  const handleTeamsFilter = () => {
    if (searchText === "") {
      setTeamsToList(allTeams);
    } else {
      setTeamsToList(
        allTeams.filter((team) =>
          team.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  };
  const handlefilterclick = () => {
    if (selectedAgency.trim() !== "") {
      history.push(`/teams/filtered/${selectedAgency}`);
    }
  };
  useEffect(() => {
    handleTeamsFilter();
  }, [searchText]);
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
                    Teams
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
                        Add Team
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
                            history.push("/teams");
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
                        Name
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                          (color === "light"
                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                        }
                      >
                        Managers
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
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {teamsToList.map((team, index) => {
                      return (
                        <tr key={index}>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {index + 1}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {team.name}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {team.managers.map((manager, index) => {
                              return <span>({manager.fname})</span>
                            })}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i
                              style={{
                                fontSize: "20px",
                                color: team.status === "1" ? "green" : "red",
                              }}
                              className={`${
                                team.status === "1"
                                  ? "fas fa-check"
                                  : "fas fa-xmark"
                              }`}
                            />
                          </td>
                          {isGie && (
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {team.agency.name}
                            </td>
                          )}
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <TableDropdown
                              isedit={isAgency}
                              isview={isGie}
                              isdelete={isAgency}
                              handleedit={() => {
                                history.push(`/teams/${team._id}`);
                              }}
                              handleview={() => {
                                history.push(`/teams/${team._id}`);
                              }}
                              handledelete={() => handledeleteclick(team._id)}
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
      {isadding && (
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
            <AddTeamModal
              handleClose={() => setisadding(false)}
              GieId={gieId}
              Agencyid={agencyId}
              handlefetch={handleGetAllteams}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Teams;
