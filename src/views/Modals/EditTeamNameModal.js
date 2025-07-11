import { addAgency } from "apis/agency";
import { updateTeamNameByAgency } from "apis/teams";
import { addTeambyAggency } from "apis/teams";
import { getAllUsersNamesByAgency } from "apis/users";
import { addUser } from "apis/users";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import toastService from "utils/Toaster/toaster";

const EditTeamNameModal = ({ handleClose,teamtoEdit, handlefetch }) => {
  const [teamName, setTeamName] = useState(teamtoEdit.name);
  const handleEditTeamName = async(e)=>{
    e.preventDefault()
    try {
        if(teamName.trim()===''){
            toastService.warn('Name Can Not Be Blank')
            return
        }
        const requestbody = {
            name: teamName,
    managerId: teamtoEdit.managerId,
    status:teamtoEdit.status
        }
        const response = await updateTeamNameByAgency(requestbody,teamtoEdit._id)
        if(!response.error){
            toastService.success('Name Updated Successfully')
            handlefetch()
            handleClose()
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div>
      <div style={{width:'30vw'}} className="flex content-center items-center justify-center h-full">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-xl font-bold">
                    Edit Team Name
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={(e) => handleEditTeamName(e)}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-red-600 text-white active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-red-600 text-white active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeamNameModal
