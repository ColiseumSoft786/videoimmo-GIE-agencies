import React, { useEffect, useState } from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import { useSelector } from "react-redux";
import { getAllUserLengthByAgency } from "apis/dashboard";
import { getAllHouseslengthByAgency } from "apis/dashboard";
import { getAllTeamsLengthByAgency } from "apis/dashboard";
import { getAllUserLengthByGie } from "apis/dashboard";
import { getAllHouseslengthByGie } from "apis/dashboard";
import { getAllTeamsLengthByGie } from "apis/dashboard";
import { getAllAgenciesLengthByGie } from "apis/dashboard";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getgietokens } from "apis/gie";

export default function HeaderStats() {
  const location = useLocation()
  const isGie = useSelector((state)=>state.login.isGie)
  const isAgency = useSelector((state)=>state.login.isAgency)
  const gieId = isGie
    ? localStorage.getItem("gie_id")
    : localStorage.getItem("parent_gie");
  const agencyId = isAgency ? localStorage.getItem("agency_id") : "";
  const [totalUsers,setTotalUsers] = useState(0)
  const [totalAgencies,setTotalAgencies] = useState(0)
  const [totalHouses,setTotalHouses] = useState(0)
  const [totalTeams,setTotalTeams] = useState(0)
  const [totalTokens,setTotalTokens] = useState(0)
  const handlegetallstats = async()=>{
    setTotalAgencies(0)
    setTotalHouses(0)
    setTotalTeams(0)
    setTotalTokens(0)
    setTotalUsers(0)
    try {
      if(isAgency&&agencyId){
        const users = await getAllUserLengthByAgency(agencyId)
        const houses = await getAllHouseslengthByAgency(agencyId)
        const teams = await getAllTeamsLengthByAgency(agencyId)
        if(!users.error){
          setTotalUsers(users.data)
        }
        if(!houses.error){
          setTotalHouses(houses.data)
        }
        if(!teams.error){
          setTotalTeams(teams.data)
        }
      }
      if(isGie&&gieId){
        const users = await getAllUserLengthByGie(gieId)
        const houses = await getAllHouseslengthByGie(gieId)
        const teams = await getAllTeamsLengthByGie(gieId)
        const agencies = await getAllAgenciesLengthByGie(gieId)
        const tokens = await getgietokens(gieId)
        if(!users.error){
          setTotalUsers(users.data)
        }
        if(!houses.error){
          setTotalHouses(houses.data)
        }
        if(!teams.error){
          setTotalTeams(teams.data)
        }
        if(!agencies.error){
          setTotalAgencies(agencies.data)
        }
        if(!tokens.error){
          setTotalTokens(tokens.data)
        }
      }

    } catch (error) {
      
    }
  }
  useEffect(()=>{
    if(window.location.pathname==='/dashboard'){
    handlegetallstats()}
  },[isAgency,isGie,agencyId,gieId,location])
  return (
    <>
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {window.location.pathname==='/dashboard'&&<div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL USERS"
                  statTitle={totalUsers}
                  statIconName="fas fa-users"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL TEAMS"
                  statTitle={totalTeams}
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL HOUSES"
                  statTitle={totalHouses}
                  statIconName="fas fa-home"
                  statIconColor="bg-pink-500"
                />
              </div>
              {isGie&&<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL AGENCIES"
                  statTitle={totalAgencies}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-lightBlue-500"
                />
              </div>}
              {isGie&&<div style={{marginTop:'20px'}} className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL TOKENS"
                  statTitle={totalTokens.tokens?totalTokens.tokens:0}
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>}
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}
