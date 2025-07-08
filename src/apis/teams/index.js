import { getAPI } from "apis"
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