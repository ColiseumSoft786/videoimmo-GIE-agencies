import React, { useEffect, useState } from "react";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import AddAgencyModal from "views/Modals/AddAgencyModal";
import Loader from "utils/Loader/Loader";
import { getAllAgencies } from "apis/agency";
import { deleteAgency } from "apis/agency";
import toastService from "utils/Toaster/toaster";
import EditAgencyModal from "views/Modals/EditAgencyModal";
import ViewAgencyModal from "views/Modals/ViewAgencyModal";
const Agencies = () => {
  const color = "light";
  const [isadding, setisadding] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [allAgencies, setAllAgencies] = useState([]);
  const [agencytoview,setagencytoview] = useState(null)
  const [isediting, setisediting] = useState(false);
  const [isviewing, setisviewing] = useState(false);
  const GieId = localStorage.getItem("gie_id");
  console.log(GieId);
  const handleGetAllAgencies = async () => {
    setisloading(true);
    if (GieId) {
      console.log("this gie id going for agencies", GieId);
      const response = await getAllAgencies(GieId);
      if (!response.error) {
        setAllAgencies(response.data);
        setisloading(false);
      }
    }
  };
  useEffect(() => {
    handleGetAllAgencies();
  }, []);
  const handleeditclick = async (agency) => {
    setagencytoview(agency)
    setisediting(true);
  };
  const handleviewclick = async(agency) => {
    setagencytoview(agency)
    setisviewing(true);
  };
  const handledeleteclick = async(id) => {
    const response = await deleteAgency(id)
    if(!response.error){
      toastService.success("Agency Deleted Successfully")
      handleGetAllAgencies()
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
                    Agencies
                  </h3>
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
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
        </div>
      </div>
      {(isadding||isediting||isviewing) && (
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
            zIndex: 20,
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
        </div>
      )}
    </>
  );
};

export default Agencies;
