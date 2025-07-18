import { addAgency } from 'apis/agency'
import { getgietokens } from 'apis/gie'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import toastService from 'utils/Toaster/toaster'

const ConfirmModal = ({handleClose , handleAction}) => {
  return (
    <div>
        <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="text-center mb-3">
                          <h6 className="text-blueGray-500 text-xl font-bold">
                            Are You Sure
                          </h6>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </div>
                      <div style={{gap:'30px'}} className="flex px-4 lg:px-10 py-10 pt-0">
                        
                          <div className="text-center mt-6" style={{display:'flex',gap:'30px'}}>
                              <button
                                className="bg-red-600 text-white active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                onClick={handleAction}
                              >
                                Yes
                              </button>
                          </div>
                          <div className="text-center mt-6">
                           <button
                                className="bg-red-600 text-white active:bg-red-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                                onClick={handleClose}
                              >
                                No
                              </button>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
    </div>
  )
}

export default ConfirmModal