import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import "react-phone-input-2/lib/style.css";
import { updateGieDetails } from "apis/gie";
import toastService from "utils/Toaster/toaster";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { updateAgencyDetails } from "apis/agency";
import { updateAgencyImage } from "apis/agency";
// components

export default function CardSettings() {
  const isGie = useSelector((state) => state.login.isGie);
  const isAgency = useSelector((state) => state.login.isAgency);
  const history = useHistory()
  const gieId = isGie
    ? localStorage.getItem("gie_id")
    : localStorage.getItem("parent_gie");
  const agencyId = isAgency ? localStorage.getItem("agency_id") : "";
  const giename = localStorage.getItem('giename')
  const agencyname = localStorage.getItem('agencyname')
  const logo = localStorage.getItem('agencyimage')
  const mobile = localStorage.getItem('mobile')
  const [name, setName] = useState('');
  const [mobileno,setmobileno] = useState('')
  const [countryCode,setCountryCode] = useState('')
  const [agencyimage,setagencyimage] = useState('')
  const handleUpdateInfo =async()=>{
    if(name===agencyname&&mobileno===mobile){
      toastService.warn('No changes to save')
      return
    }
    if(isGie){
      const requestbody = {
         name: name ,
    countryCode: countryCode,
    phone: mobileno.slice(countryCode.length-1)
      }
      console.log(requestbody)
      const response = await updateGieDetails(requestbody,gieId)
      if(!response.error){
        localStorage.setItem('giename',name)
        localStorage.setItem('mobile',mobileno)
        toastService.success('Details Updated SuccessFully')
        history.push('/dashboard')
      }
    }
    if(isAgency){
      const requestbody = {
        name:name,
    countryCode: countryCode,
    phone: mobileno.slice(countryCode.length-1),
      }
      console.log(requestbody)
      const response = await updateAgencyDetails(requestbody,agencyId)
      if(!response.error){
        localStorage.setItem('agencyname',name)
        localStorage.setItem('agencyimage',agencyimage)
        localStorage.setItem('mobile',mobileno)
        toastService.success('Details Updated SuccessFully')
        history.push('/dashboard')
      }
    }
  }
   const handleImageUpload = async () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeInMB = file.size / (1024 * 1024);
    console.log('this is the image',file)
    if (sizeInMB > 5) {
      toastService.warn("Image cannot be greater than 1024 MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(",")[1];
      const requestbody = {
        name: file.name,
        image: base64String,
        id: agencyId,
      };
      const response = await updateAgencyImage(requestbody);
      if (!response.error) {
        setagencyimage(response.data.image);
        localStorage.setItem("agencyimage", response.data.image);
        history.push("/dashboard");
      }
    };
    reader.readAsDataURL(file);
  };
  input.click(); // open file dialog
};

  useEffect(()=>{
    setName(giename?giename:agencyname)
    setmobileno(mobile?mobile:'')
    setagencyimage(logo?logo:'')
  },[giename,agencyname,mobile,logo])
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mbc-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              My {isGie ? "GIE" : "Agency"}
            </h6>
            <button
              className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleUpdateInfo}
            >
              Update
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              {isAgency ? "Agency" : "GIE"} Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:border-none w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 ">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Mobile no.
                  </label>
                  <PhoneInput
                    onChange={(value, data) => {
                      setmobileno(value);
                      setCountryCode(`+${data.dialCode}`);
                    }}
                    country={"fr"}
                    value={mobileno}
                    countryCodeEditable={false}
                    inputStyle={{outline:'none',border:'none'}}
                    className="border-0 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
            {isAgency&&(<><h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Agency Image
            </h6>
            <div className="flex flex-col gap-6" style={{width:'20vw',gap:'20px'}}>
              {agencyimage&&agencyimage!==''?(
                <div>
                <div style={{height:'20vw',width:'20vw',overflow:'hidden',borderRadius:'50%'}}>
                    <img alt="Agency Image" style={{height:'100%',width:'100%'}} src={`https://api.videorpi.com/${agencyimage}`}/>
                </div>
              </div>
              ):(
                <div className="items-center flex">
          <span style={{height:'20vw',width:'20vw',fontSize:'15vw'}} className=" text-white bg-red-400 inline-flex items-center justify-center rounded-full">
            <i class="fas fa-user"></i>
          </span>
        </div>
              )}
           <button
              className="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleImageUpload}
            >
              Update Image
            </button>
            </div></>)}
          </form>
        </div>
      </div>
    </>
  );
}
