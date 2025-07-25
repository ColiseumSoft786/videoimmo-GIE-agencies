import { addAgency } from "apis/agency";
import { updateTeamManagersByAgency } from "apis/teams";
import { addTeambyAggency } from "apis/teams";
import { getAllUsersNamesByAgency } from "apis/users";
import { getOtherUserNames } from "apis/users";
import { agetOtherUserNames } from "apis/users";
import { addUser } from "apis/users";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import toastService from "utils/Toaster/toaster";

const AddManagerModal = ({ handleClose,Team,handlefetch }) => {
  const [selectedManager, setSelectedManager] = useState("");
  const [allUsers,setAllUsers] = useState([])
  const handleGetAllUserNames = async()=>{
    try {
        const response = await getOtherUserNames(Team._id,Team.agency._id)
        if(!response.error){
            setAllUsers(response.data.data)
        }
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    handleGetAllUserNames()
  },[])
  const handleAddTeam = async(e)=>{
    e.preventDefault()
    try {
        if(selectedManager.trim()===''){
            toastService.warn('Please Select Manager')
            return
        }
        const requestbody = [...Team.managers,selectedManager]
        const response = await updateTeamManagersByAgency(requestbody,Team._id)
        if(!response.error){
            toastService.success('Manager Added Successfully')
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
                  Add Manager
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={(e) => handleAddTeam(e)}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Select Manager
                  </label>
                  <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={selectedManager}
                    onChange={(e)=>setSelectedManager(e.target.value)}
                  >
                    <option value="">Select</option>
                    {allUsers.map((user,index)=>{
                        return(
                            <option value={user._id} key={index}>{user.fname}</option>
                        )
                    })}
                  </select>
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-red-600 text-white active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Add
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

export default AddManagerModal;
