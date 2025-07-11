import { updateAgency } from 'apis/agency'
import { addAgency } from 'apis/agency'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import toastService from 'utils/Toaster/toaster'

const ViewUserModal = ({handleClose , Usertoview}) => {
    const [useremail, setuseremail] = useState(Usertoview.email);
        const [mobileno,setmobileno] = useState(Usertoview.country_Code+Usertoview.mobile_no)
        const [countryCode,setCountryCode] = useState(Usertoview.country_Code)
        const [name,setname]= useState(Usertoview.fname)
  return (
    <div>
        <div className="flex content-center items-center justify-center h-full">
                  <div style={{width:'45vw'}} className=" px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                          <h6 className="text-blueGray-500 text-xl font-bold">
                            View User
                          </h6>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </div>
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form onSubmit={(e)=>e.preventDefault()}> 
                            <div className='flex justify-between'>
                            <div>      
                            <div className="relative w-full mb-3">
                              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                Email
                              </label>
                              <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Enter Agency Name"
                                value={useremail}
                                readOnly
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
                                inputProps={{
                                    readOnly:true
                                }}
                              />
                            </div>
                            </div>
                            <div className='h-full w-[30%] content-center items-center flex flex-col'>
                              {Usertoview.image.trim()===''?(<span
                                  style={{ height: "10vw", width: "10vw",fontSize:'6vw' }}
                                  className="text-white bg-red-500 inline-flex items-center justify-center rounded-full"
                                >
                                  <i class="fas fa-user"></i>
                                </span>):(
                                  <div className='overflow-hidden' style={{border:'1px solid black',height:'10vw',width:'10vw',borderRadius:'50%'}}>
                                <img alt={name} src={`https://api.videorpi.com/${Usertoview.image}`} className='h-full w-full'/>
                              </div>
                                )}
                            <span>{name}</span>
                            </div>
                            </div>
                          <div className="text-center mt-6">
                           <button
                                className="bg-red-600 text-white active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                onClick={handleClose}
                              >
                                Close
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

export default ViewUserModal