import { putAPI } from "apis"
import { deleteAPI } from "apis"
import { postAPI } from "apis"
import { getAPI } from "apis"
import { GET_MANAGER_TEAM } from "apis/apiurls"
import { GET_ALL_GIE_TEAMS } from "apis/apiurls"
import { DELETE_TEAM_BY_AGENCY } from "apis/apiurls"
import { UPDATE_TEAM_MANAGERS } from "apis/apiurls"
import { UPDATE_TEAM_NAME } from "apis/apiurls"
import { UPDATE_TEAM_MEMBERS } from "apis/apiurls"
import { ADD_TEAM_BY_AGENCY } from "apis/apiurls"
import { GET_ALL_TEAMS_BY_AGENCY } from "apis/apiurls"

export const getAllTeams = async(id)=>{
    try {
        const path = GET_ALL_TEAMS_BY_AGENCY+id
        const response = await getAPI(path,true)
        console.log('response from get all teams ',response)
        return response
    } catch (error) {
        console.log('error in get all teams',error)
    }
}
export const addTeambyAggency = async(body)=>{
    try {
        const response = await postAPI(ADD_TEAM_BY_AGENCY,body,true)
        console.log('response from add team by aggency',response)
        return response
    } catch (error) {
        console.log('error in add team by aggency',error)
    }
}
export const updateTeamNameByAgency = async(body,id)=>{
    try {
        const path = UPDATE_TEAM_NAME+id
        const response =await putAPI(path,body,true)
        console.log('response from update team name ',response)
        return response
    } catch (error) {
        console.log('error in update team name ', error)
    }
}
export const updateTeamMembersByAgency = async(body,id)=>{
    try {
        const path = UPDATE_TEAM_MEMBERS+id
        const response = await putAPI(path,body,true)
        console.log('response from update team members',response)
        return response
    } catch (error) {
        console.log("error in update member",error)
    }
}
export const updateTeamManagersByAgency = async(body,id)=>{
    try {
        const path = UPDATE_TEAM_MANAGERS+id
        const response = await putAPI(path,body,true)
        console.log('response from update team managers',response)
        return response
    } catch (error) {
        console.log('error in update team managers',error)
    }
}
export const getTeamByManagerId = async(id)=>{
    try {
        const path = GET_MANAGER_TEAM+id
        const response = await getAPI(path,true)
        console.log('response from get manager team ',response)
        return response
    } catch (error) {
        console.log('error in the get manager team',error)
    }
}
export const deleteTeamByAgency = async(id)=>{
    try {
        const path = DELETE_TEAM_BY_AGENCY+id
        const response = await deleteAPI(path,{},true)
        console.log('response from delete team by agency',response)
        return response
    } catch (error) {
        console.log('error in delete team by agency',error)
    }
}
export const getAllGieTeams = async(id)=>{
    try {
        const path = GET_ALL_GIE_TEAMS+id
        const response = await getAPI(path,true)
        console.log('response from get all gie teams',response)
        return response
    } catch (error) {
        console.log('error in get all gie teams',error)
    }
}