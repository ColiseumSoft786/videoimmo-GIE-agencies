import { addAgency } from 'apis/agency'
import { addUser } from 'apis/users'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import toastService from 'utils/Toaster/toaster'

const AddUserModal = ({handleClose , GieId,Agencyid , handlefetch}) => {
    const [useremail, setuseremail] = useState("");
    const [mobileno,setmobileno] = useState('')
    const [countryCode,setCountryCode] = useState('')
    const [name,setname]= useState('')
    const handleAddUser = async(e) =>{
        e.preventDefault()
        if(name.trim()===''||mobileno.trim()===''||countryCode.trim()===''||useremail.trim()===''){
            toastService.warn('All Fields Must Be Filled')
            return
        }
        const requestbody = {
            image: "",
      fname: name,
      lname: "",
      country_Code: countryCode,
      email: useremail,
      mobile_no: mobileno.slice(countryCode.length-1),
      type: "user",
      gie:GieId,
      agency:Agencyid
        }
        const response = await addUser(requestbody)
        if(!response.error){
            toastService.success('User Added Successfully')
            handlefetch()
            handleClose()
        }
    }
  return (
    <div>
        <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                          <h6 className="text-blueGray-500 text-sm font-bold">
                            Add User
                          </h6>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </div>
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form onSubmit={(e)=>handleAddUser(e)}>        
                            <div className="relative w-full mb-3">
                              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                Full Name
                              </label>
                              <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter Full Name"
                                value={name}
                                onChange={(e)=>setname(e.target.value)}
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                Email
                              </label>
                              <input
                                type="email"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter User Email"
                                value={useremail}
                                onChange={(e)=>setuseremail(e.target.value)}
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                Mobile #
                              </label>
                              <PhoneInput
                                onChange={(value, data) => {
                                  setmobileno(value);
                                  setCountryCode(`+${data.dialCode}`);
                                }}
                                country={"fr"}
                                value={mobileno}
                                countryCodeEditable={false}
                              />
                            </div>
                          <div className="text-center mt-6">
                              <button
                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                type="submit"
                              >
                                Add
                              </button>
                          </div>
                          <div className="text-center mt-6">
                           <button
                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
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
  )
}

export default AddUserModal