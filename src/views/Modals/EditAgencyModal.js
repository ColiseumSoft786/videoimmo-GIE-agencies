import { updateAgency } from 'apis/agency'
import { addAgency } from 'apis/agency'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import toastService from 'utils/Toaster/toaster'

const EditAgencyModal = ({handleClose , agencytoview , handlefetch}) => {
    const [mobileno,setmobileno] = useState(`${agencytoview.countryCode}${agencytoview.phone}`)
    const [countryCode,setCountryCode] = useState(agencytoview.countryCode)
    const [name,setname]= useState(agencytoview.name)
    const handleEditAgency = async(e) =>{
        e.preventDefault()
        if(name.trim()===''||mobileno.trim()===''||countryCode.trim()===''){
            toastService.warn('All Fields Must Be Filled')
            return
        }
        if(name===agencytoview.name&&countryCode===agencytoview.countryCode&&mobileno.slice(countryCode.length-1)===agencytoview.phone){
            toastService.warn('No Changes To Save')
            return
        }
        const requestbody = {
            image:"",
            name:name,
            phone:mobileno.slice(countryCode.length-1),
            countryCode:countryCode,
            gie: agencytoview.gie._id
        }
        const response = await updateAgency(requestbody,agencytoview._id)
        if(!response.error){
            toastService.success('Agency Edited Successfully')
            handlefetch()
            handleClose()
        }
    }
  return (
    <div>
        <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                          <h6 className="text-blueGray-500 text-xl font-bold">
                            Edit Agency
                          </h6>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </div>
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form onSubmit={(e)=>handleEditAgency(e)}>        
                            <div className="relative w-full mb-3">
                              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                Name
                              </label>
                              <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter Agency Name"
                                value={name}
                                onChange={(e)=>setname(e.target.value)}
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
                                className="bg-red-600 text-white active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                type="submit"
                              >
                                Edit
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
  )
}

export default EditAgencyModal