import React, { useEffect, useState } from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllGieUsernames } from "apis/users";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllUsersNamesByAgency } from "apis/users";
import { getAllGieTeamsNames } from "apis/teams";
import { getAllAgencyTeamsNames } from "apis/teams";
import { getAllAgenciesNames } from "apis/agency";

export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation()
  const history = useHistory()
  const isGie = useSelector((state) => state.login.isGie);
  const isAgency = useSelector((state)=>state.login.isAgency)
  const [isexpired,setisexpired] = useState(false)
  const expiry = localStorage.getItem("expiry");
  const giename = localStorage.getItem("giename");
  const agencyname = localStorage.getItem("agencyname");
  const gieId = isGie
    ? localStorage.getItem("gie_id")
    : localStorage.getItem("parent_gie");
  const agencyId = isAgency ? localStorage.getItem("agency_id") : "";
  const [userName, setUserName] = useState("");
  // const [searchText,setSearchText] = useState('');
  // const [listitems,setlistitems] = useState([])
  // const [listitemstoshow,setlistitemstoshow] = useState([])
  useEffect(() => {
    setUserName(giename ? giename : agencyname);
  }, [giename, agencyname]);
  // useEffect(()=>{
  //   if(expiry>=new Date){
  //     setisexpired(true)
  //   }
  // },[])
  //  const handlegetlistitems = async()=>{
  //   let items = []
  //   if(window.location.pathname.includes('users')&&isGie){
  //     items = await getAllGieUsernames(gieId)
  //   }
  //   if(window.location.pathname.includes('users')&&isAgency){
  //     items = await getAllUsersNamesByAgency(agencyId)
  //   }
  //   if(window.location.pathname.includes('teams')&&isGie){
  //     items = await getAllGieTeamsNames(gieId)
  //   }
  //   if(window.location.pathname.includes('teams')&&isAgency){
  //     items = await getAllAgencyTeamsNames(agencyId)
  //   }
  //   if(window.location.pathname.includes('agencies')&&isGie){
  //     items = await getAllAgenciesNames(gieId)
  //   }
  //   if(!items.error){
  //     setlistitems(items.data)
  //     setlistitemstoshow(items.data)
  //   }
  // }
  // useEffect(()=>{
  //   handlegetlistitems()
  //   setSearchText('')
  // },[location,isGie,isAgency])
  // useEffect(()=>{
  //   if(window.location.pathname.includes('users')){
  //     setlistitemstoshow(listitems.filter((item)=>item.fname.toLowerCase().includes(searchText.toLowerCase())))
  //   }else{
  //     setlistitemstoshow(listitems.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase())))
  //   }
  // },[searchText])
  // const handlesuggestionclick = (id)=>{
  //   if(window.location.pathname.includes('users')){
  //     history.push(`/users/searched/${id}`)
  //   }
  //   if(window.location.pathname.includes('agencies')){
  //     history.push(`/agencies/searched/${id}`)
  //   }
  //   if(window.location.pathname.includes('teams')){
  //     history.push(`/teams/searched/${id}`)
  //   }
  //   setSearchText('')
  // }
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a style={{marginRight:'20px'}} className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
            {userName}
          </a>
          {isGie && (
            <a className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
             { isexpired?'Expired':`Expires On : ${expiry.slice(0, 10)}`}
            </a>
          )}
          {/* Form */}
          {/* {!window.location.pathname.includes("houses") &&
            !window.location.pathname.includes("settings") &&
            !window.location.pathname.includes("dashboard") && (
              <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                <div className="relative flex w-full flex-wrap items-stretch">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Search here..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                  />
                  {searchText.trim()!==''&&<div style={{backgroundColor:'white',position:'absolute',top:'50px',left:'0',width:'315px',maxHeight:'40vw',overflowY:'scroll'}}>
                {listitemstoshow.map((item,index)=>{
                  return(
                    <div onClick={()=>handlesuggestionclick(item._id)} style={{padding:'10px',textAlign:'left',cursor:'pointer'}} key={index}>{window.location.pathname.includes('users')?item.fname:item.name}</div>
                  )
                })}
              </div>}
                </div>
              </form>
            )} */}
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
