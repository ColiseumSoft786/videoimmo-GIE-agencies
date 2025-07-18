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
import { getAllAgenciesLengthByGie } from "apis/dashboard";
import { getsingleagency } from "apis/agency";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import ConfirmModal from "views/Modals/ConfirmModal";
const Agencies = () => {
  const color = "light";
  const {page,agid} = useParams()
  const location = useLocation()
  console.log(page)
  const history = useHistory()
  const [isadding, setisadding] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [allAgencies, setAllAgencies] = useState([]);
  const [agencytoview,setagencytoview] = useState(null)
  const [isediting, setisediting] = useState(false);
  const [isviewing, setisviewing] = useState(false);
  const [isconfirm ,setisconfirm] = useState(false)
  const [deleteid,setdeleteid] = useState('')
  const isGie = useSelector((state) => state.login.isGie);
    const isAgency = useSelector((state) => state.login.isAgency);
  const GieId = localStorage.getItem("gie_id");
       const [currentpage,setcurrentpage] = useState(Number(page))
       const [totalpages,settotalpages] = useState(0)
      const [totalitems,settotalitems] = useState(0)
      const getpages = async()=>{
        let pages = null
        if (isGie) {
            pages = await getAllAgenciesLengthByGie(GieId)
            }
        if(!pages?.error){
          settotalitems(Number(pages?.data))
          settotalpages(Math.ceil(pages?.data/20))
        }else{
          settotalitems(0)
          settotalpages(1)
        }
      }
      const handleprev=()=>{
        if(currentpage>1){
          const prev = currentpage-1
              history.push(`/agencies/${prev}`)
        }
      }
      const handlenext=()=>{
        if(currentpage<totalpages){
          const next = currentpage+1
              history.push(`/agencies/${next}`)
        }
      }
      useEffect(()=>{
        setcurrentpage(Number(page))
      },[page])
  console.log(GieId);
  const handleGetAllAgencies = async () => {
    setisloading(true);
    if (GieId) {
      console.log("this gie id going for agencies", GieId);
      const issearched = window.location.pathname.includes('searched')
      let response = {}
      if(issearched){
        console.log('agency to fetch ',agid)
        response = await getsingleagency(agid)
      }else{
      response = await getAllAgencies(GieId,page);}
      if (!response.error) {
        if(issearched){
          setAllAgencies([response.data])
        }else{
        setAllAgencies(response.data);}
        setisloading(false);
      }
    }
  };
  useEffect(() => {
    handleGetAllAgencies();
    getpages()
  }, [location,isGie,isAgency]);
  const handleeditclick = async (agency) => {
    setagencytoview(agency)
    setisediting(true);
  };
  const handleviewclick = async(agency) => {
    setagencytoview(agency)
    setisviewing(true);
  };
  const handledeleteagency = async(id)=>{
    const response = await deleteAgency(id)
    if(!response.error){
      toastService.success("Agency Deleted Successfully")
      handleGetAllAgencies()
      setisconfirm(false)
    }
  }
  const handledeleteclick = (id) => {
    setdeleteid(id)
    setisconfirm(true)
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
                    Agencies
                  </h3>
                  <button
                    className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    onClick={() => setisadding(true)}
                  >
                    Add Agency
                  </button>
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
                        Mobile #
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
                    {allAgencies.map((agency, index) => {
                      return (
                        <tr key={index}>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {index + 1}
                          </td>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            {agency.image.trim() === "" ? (
                              <div>
                                <span
                                  style={{ height: "25px", width: "25px" }}
                                  className=" text-sm text-white bg-blueGray-600 inline-flex items-center justify-center rounded-full"
                                >
                                  <i class="fas fa-user"></i>
                                </span>
                              </div>
                            ) : (
                              <img
                                src={`https://api.videorpi.com/${agency.image}`}
                                style={{ height: "25px", width: "25px" }}
                                className=" bg-white rounded-full border"
                                alt="..."
                              ></img>
                            )}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {agency.name}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {agency.countryCode}-{agency.phone}
                          </td>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <TableDropdown
                              isedit={true}
                              isview={true}
                              isdelete={true}
                              handleedit={()=>handleeditclick(agency)}
                              handleview={()=>handleviewclick(agency)}
                              handledelete={()=>handledeleteclick(agency._id)}
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
      {(isadding||isediting||isviewing||isconfirm) && (
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
            <AddAgencyModal
              handleClose={() => setisadding(false)}
              GieId={GieId}
              handlefetch={handleGetAllAgencies}
            />
          )}
          {isediting && (
            <EditAgencyModal
            handleClose={()=>setisediting(false)}
            agencytoview={agencytoview} 
            handlefetch={handleGetAllAgencies}
            />
          )}
          {isviewing && (
            <ViewAgencyModal
            handleClose={()=>setisviewing(false)}
            agencytoview={agencytoview}
            />
          )}
          {isconfirm && (
            <ConfirmModal
            handleClose={()=>setisconfirm(false)}
            handleAction = {()=>handledeleteagency(deleteid)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Agencies;
