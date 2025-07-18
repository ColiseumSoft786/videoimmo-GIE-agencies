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
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getTeamByManagerId } from "apis/teams";
import EditTeamNameModal from "./EditTeamNameModal";
import AddManagerModal from "./AddManagerModal";
import AddMemberModal from "./AddMemberModal";
import { updateTeamMembersByAgency } from "apis/teams";
import { updateTeamManagersByAgency } from "apis/teams";
import ConfirmModal from "./ConfirmModal";
const EditTeamModal = () => {
  const color = "light";
  const isGie = useSelector((state) => state.login.isGie);
  const { id } = useParams();
  const isAgency = useSelector((state) => state.login.isAgency);
  const gieId = isGie
    ? localStorage.getItem("gie_id")
    : localStorage.getItem("parent_gie");
  const agencyId = isAgency ? localStorage.getItem("agency_id") : "";
  const [isloading, setisloading] = useState(true);
  const [allManagers, setAllManagers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [mainTeam, setMainTeam] = useState(null);
  const [isediting, setisEditing] = useState(false);
  const [isManagerAdd,setisManagerAdd] = useState(false)
  const [isMemberAdd,setIsMemberAdd] = useState(false)
  const [managerconfirm,setmanagerconfirm] = useState(false)
  const [memberconfirm,setmemberconfirm] = useState(false)
  const [deleteid,setdeleteid] = useState('')
  const handleGetManagerTeam = async () => {
    try {
      setisloading(true);
      const response = await getTeamByManagerId(id);
      if (!response.error) {
        setAllManagers(response.data.data.managers);
        setAllMembers(response.data.data.members);
        setMainTeam(response.data.data);
        setisloading(false);
      }
    } catch (error) {
      console.log("error in fetching team", error);
    }
  };
  useEffect(() => {
    handleGetManagerTeam();
  }, []);
  const handledeleteclick = async (id) => {
    const response = await deleteUser(id);
    if (!response.error) {
      toastService.success("User Deleted Successfully");
      handleGetAllUsers();
    }
  };
  const handleRemoveMember = async(memberid)=>{
          const requestbody = mainTeam.members.filter((member)=>member._id!==memberid)
          console.log("this is request body",requestbody)
          const response = await updateTeamMembersByAgency(requestbody,mainTeam._id)
          if(!response.error){
              toastService.success('Member Removed Successfully')
              handleGetManagerTeam()
              setmemberconfirm(false)
          }
    }
  const handleremovememberclick = (memberid)=>{
    setdeleteid(memberid)
    setmemberconfirm(true)
  }
  const handleRemoveManager = async(managerid)=>{
    const requestbody = mainTeam.managers.filter((manager)=>manager._id!==managerid)
    const response = await updateTeamManagersByAgency(requestbody,mainTeam._id)
    if(!response.error){
        toastService.success('Manager Removed Successfully')
        handleGetManagerTeam()
        setmanagerconfirm(false)
    }
  }
  const handleremovemanagerclick = (managerid)=>{
    setdeleteid(managerid)
    setmanagerconfirm(true)
  }
  return (
    <>
      {isloading ? (
        <div
          className="w-full absolute flex justify-center"
          style={{ top: "350px" }}
        >
          <Loader />
        </div>
      ) : (
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
                  <div className="relative w-full max-w-full flex justify-between">
                    <h3
                      className={
                        "font-semibold text-lg " +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                      }
                    >
                      {mainTeam.name}
                    </h3>
                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        justifyContent: isGie ? "space-between" : "end",
                      }}
                    >
                      {isAgency && !isGie && (
                        <button
                          className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          onClick={() => setisEditing(true)}
                        >
                          Edit Team Name
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <div className="block w-full overflow-x-auto">
                  {/* Projects table */}
                  <div className="relative w-full py-2 px-4 max-w-full flex justify-between">
                    <h3
                      className={
                        "font-semibold text-lg " +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                      }
                    >
                      Managers
                    </h3>
                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        justifyContent: isGie ? "space-between" : "end",
                      }}
                    >
                      {isAgency && !isGie && (
                        <button
                          className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          onClick={() => setisManagerAdd(true)}
                        >
                          Add Manager
                        </button>
                      )}
                    </div>
                  </div>
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
                        {isAgency&&<th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                          }
                        >
                          Actions
                        </th>}
                      </tr>
                    </thead>

                    <tbody>
                      {allManagers.map((manager, index) => {
                        return (
                          <tr key={index}>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {index + 1}
                            </td>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                              {manager.image.trim() === "" ? (
                                <div>
                                  <span
                                    style={{ height: "25px", width: "25px" }}
                                    className=" text-sm text-white bg-red-500 inline-flex items-center justify-center rounded-full"
                                  >
                                    <i class="fas fa-user"></i>
                                  </span>
                                </div>
                              ) : (
                                <img
                                  src={`https://api.videorpi.com/${manager.image}`}
                                  style={{ height: "25px", width: "25px" }}
                                  className=" bg-white rounded-full border"
                                  alt="..."
                                ></img>
                              )}
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {manager.fname}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {manager.country_Code}-{manager.mobile_no}
                            </td>
                            {isAgency&&<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                              <TableDropdown
                                isedit={false}
                                isview={false}
                                isdelete={true}
                                handleedit={{}}
                                handleview={{}}
                                handledelete={() =>
                                  handleremovemanagerclick(manager._id)
                                }
                              />
                            </td>}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="block w-full overflow-x-auto">
                  {/* Projects table */}
                  <div className="relative w-full py-2 px-4 max-w-full flex justify-between">
                    <h3
                      className={
                        "font-semibold text-lg " +
                        (color === "light" ? "text-blueGray-700" : "text-white")
                      }
                    >
                      Members
                    </h3>
                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        justifyContent: isGie ? "space-between" : "end",
                      }}
                    >
                      {isAgency && !isGie && (
                        <button
                          className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          onClick={() => setIsMemberAdd(true)}
                        >
                          Add Member
                        </button>
                      )}
                    </div>
                  </div>
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
                       {isAgency&& <th
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                            (color === "light"
                              ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                              : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                          }
                        >
                          Actions
                        </th>}
                      </tr>
                    </thead>

                    <tbody>
                      {allMembers.map((manager, index) => {
                        return (
                          <tr key={index}>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {index + 1}
                            </td>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                              {manager.image.trim() === "" ? (
                                <div>
                                  <span
                                    style={{ height: "25px", width: "25px" }}
                                    className=" text-sm text-white bg-red-500 inline-flex items-center justify-center rounded-full"
                                  >
                                    <i class="fas fa-user"></i>
                                  </span>
                                </div>
                              ) : (
                                <img
                                  src={`https://api.videorpi.com/${manager.image}`}
                                  style={{ height: "25px", width: "25px" }}
                                  className=" bg-white rounded-full border"
                                  alt="..."
                                ></img>
                              )}
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {manager.fname}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {manager.country_Code}-{manager.mobile_no}
                            </td>
                            {isAgency&&<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                              <TableDropdown
                                isedit={false}
                                isview={false}
                                isdelete={true}
                                handleedit={{}}
                                handleview={{}}
                                handledelete={() =>
                                  handleremovememberclick(manager._id)
                                }
                              />
                            </td>}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {(isediting||isManagerAdd||isMemberAdd||managerconfirm||memberconfirm) && (
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
          {isManagerAdd&&<AddManagerModal handleClose={()=>setisManagerAdd(false)}Team={mainTeam} handlefetch={handleGetManagerTeam}/>}
          {isMemberAdd&&<AddMemberModal handleClose={()=>setIsMemberAdd(false)}Team={mainTeam} handlefetch={handleGetManagerTeam}/>}
          {isediting&&<EditTeamNameModal handleClose={()=>setisEditing(false)} teamtoEdit={mainTeam} handlefetch={handleGetManagerTeam}/>}
          {managerconfirm&&<ConfirmModal handleClose={()=>setmanagerconfirm(false)} handleAction={()=>handleRemoveManager(deleteid)}/>}
          {memberconfirm&&<ConfirmModal handleClose={()=>setmemberconfirm(false)} handleAction={()=>handleRemoveMember(deleteid)}/>}
        </div>
      )}
    </>
  );
};

export default EditTeamModal;
