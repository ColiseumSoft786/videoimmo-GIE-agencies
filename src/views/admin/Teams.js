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
import { getAllTeamsLengthByAgency } from "apis/dashboard";
import { getAllTeamsLengthByGie } from "apis/dashboard";
import { getTeamByManagerId } from "apis/teams";
import ConfirmModal from "views/Modals/ConfirmModal";
const Teams = () => {
  const color = "light";
  const location = useLocation();
  const { agId, page, teamid } = useParams();
  const history = useHistory();
  const isGie = useSelector((state) => state.login.isGie);
  const isAgency = useSelector((state) => state.login.isAgency);
  const gieId = isGie
    ? localStorage.getItem("gie_id")
    : localStorage.getItem("parent_gie");
  const agencyId = isAgency ? localStorage.getItem("agency_id") : "";
  const [isloading, setisloading] = useState(true);
  const [allTeams, setAllTeams] = useState([]);
  const [isadding, setisadding] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState("");
  const [allagencies, setallagencies] = useState([]);
  const [currentpage, setcurrentpage] = useState(Number(page));
  const [totalpages, settotalpages] = useState(0);
  const [totalitems, settotalitems] = useState(0);
  const [isconfirm,setisconfirm] = useState(false)
  const [deleteid,setdeleteid] = useState('')
  const getpages = async () => {
    let pages = null;
    if (isGie) {
      if (agId) {
        pages = await getAllTeamsLengthByAgency(agId);
      } else {
        pages = await getAllTeamsLengthByGie(gieId);
      }
    }
    if (isAgency) {
      pages = await getAllTeamsLengthByAgency(agencyId);
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
          history.push(`/teams/agency/${selectedAgency}/${prev}`);
        } else {
          history.push(`/teams/${prev}`);
        }
      }
      if (isAgency) {
        history.push(`/teams/${prev}`);
      }
    }
  };
  const handlenext = () => {
    if (currentpage < totalpages) {
      const next = currentpage + 1;
      if (isGie) {
        if (agId) {
          history.push(`/teams/agency/${selectedAgency}/${next}`);
        } else {
          history.push(`/teams/${next}`);
        }
      }
      if (isAgency) {
        history.push(`/teams/${next}`);
      }
    }
  };
  useEffect(() => {
    setcurrentpage(Number(page));
  }, [page]);
  const handleGetAllteams = async () => {
    try {
      setisloading(true);
      let response = {};
      const issearched = window.location.pathname.includes("searched");
      if (isGie&&!issearched) {
        if (agId) {
          response = await getAllTeams(agId, page);
          if (!response.error) {
            setAllTeams(response.data);
            setisloading(false);
          }
        }
        if (!agId) {
          response = await getAllGieTeams(gieId, page);
          if (!response.error) {
            setAllTeams(response.data);
            setisloading(false);
          }
        }
      }
      if (isAgency&&!issearched) {
        response = await getAllTeams(agencyId, page);
        if (!response.error) {
          setAllTeams(response.data);
          setisloading(false);
        }
      }
      if (issearched) {
          response = await getTeamByManagerId(teamid);
          if (!response.error) {
            setAllTeams([response.data.data]);
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
    if (window.location.pathname.includes("teams")) {
      handleGetAllteams();
      if (isGie) {
        handleGetAllAgencyNames();
        if(agId){
          setSelectedAgency(agId)
        }
      }
    }
  }, [location, isGie, isAgency]);
  const handledeleteteam = async(id)=>{
    const response = await deleteTeamByAgency(id);
    if (!response.error) {
      toastService.success("Team Deleted Successfully");
      handleGetAllteams();
      setisconfirm(false)
    }
  }
  const handledeleteclick = (id) => {
    setdeleteid(id)
    setisconfirm(true)
  };
  const handlefilterclick = () => {
    if (selectedAgency.trim() !== "") {
      history.push(`/teams/filtered/${selectedAgency}/1`);
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
                            history.push("/teams/1");
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
                    {allTeams.map((team, index) => {
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
                              return <span>({manager.fname})</span>;
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
                                history.push(`/team/${team._id}`);
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
      {(isadding||isconfirm) && (
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
          {isconfirm&&(
            <ConfirmModal
             handleClose={()=>setisconfirm(false)}
             handleAction={()=>handledeleteteam(deleteid)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Teams;
