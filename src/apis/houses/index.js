import { deleteAPI } from "apis"
import { getAPI } from "apis"
import { GET_ALL_HOUSES_BY_GIE } from "apis/apiurls"
import { DELETE_HOUSE_BY_AGENCY } from "apis/apiurls"
import { GET_ALL_HOUSES_BY_AGENCY } from "apis/apiurls"
import { GET_USER_HOUSES } from "apis/apiurls"

export const getAllUserHouses = async(id)=>{
    try {
        const path = GET_USER_HOUSES+id
        const response = await getAPI(path,true)
        console.log('response from get user houses',response)
        return response
    } catch (error) {
        console.log('error in get user houses',error)
    }
}
export const getAllHousesByAgency = async(agency)=>{
    try {
        const path = GET_ALL_HOUSES_BY_AGENCY+agency
        const response = await getAPI(path,true)
        console.log('response from get all houses by agency',response)
        return response
    } catch (error) {a
        console.log('error in get all houses by agency',error)
    }
}
export const deleteHouseByAgency = async(id)=>{
    try {
        const path = DELETE_HOUSE_BY_AGENCY+id
        const response = await deleteAPI(path,{},true)
        console.log('response form delete house by agency',response)
        return response
    } catch (error) {
        console.log('error in delete house by agency',error)
    }
}
export const getHousesByGie = async(id)=>{
    try {
        const path = GET_ALL_HOUSES_BY_GIE+id
        const response = await getAPI(path,true)
        console.log('response from get all houses by gie',response)
        return response
    } catch (error) {
        console.log('error in get all houses by gie',error)
    }
}