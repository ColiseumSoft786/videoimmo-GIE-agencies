import { getAPI } from "apis"
import { GET_ALL_GIE_TEAMS_LENGTH } from "apis/apiurls"
import { GET_AGENCY_HOUSE_LENGTH } from "apis/apiurls"
import { GET_ALL_AGENCY_TEAMS_LENGTH } from "apis/apiurls"
import { GET_ALL_GIE_USERS_LENGTH } from "apis/apiurls"
import { GET_ALL_AGENCY_USERS_LENGTH } from "apis/apiurls"

export const getAllUserLengthByAgency = async(id)=>{
    try {
        const path = GET_ALL_AGENCY_USERS_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get all agency user length',response)
        return response
    } catch (error) {
        console.log('error in get all user lenght by agency',error)
    }
}
export const getAllUserLengthByGie = async(id)=>{
    try {
        const path = GET_ALL_GIE_USERS_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get all gie user lenght ',response)
        return response
    } catch (error) {
        console.log('error in get all user lenght by gie ',error)
    }
}
export const getAllTeamsLengthByAgency = async(id)=>{
    try {
        const path = GET_ALL_AGENCY_TEAMS_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get all agency teams length',response)
        return response
    } catch (error) {
        console.log('error in get all teams lenght by agency',error)
    }
}
export const getAllTeamsLengthByGie = async(id)=>{
    try {
        const path =  GET_ALL_GIE_TEAMS_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get all gie teams length',response)
        return response
    } catch (error) {
        console.log('error in get all gie teams length ',error)
    }
}
export const getAllHouseslengthByAgency = async (id)=>{
    try {
        const path = GET_AGENCY_HOUSE_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get all houses length by agency',response)
        return response
    } catch (error) {
        console.log('error in get all houses lenghht by agency',error)
    }
}