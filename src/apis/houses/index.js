import { deleteAPI } from "apis"
import { getAPI } from "apis"
import { GET_GIE_HOUSE_LENGTH } from "apis/apiurls"
import { GET_AGENCY_HOUSE_LENGTH } from "apis/apiurls"
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
export const getAllHousesByAgency = async(agency,page)=>{
    try {
        const path = GET_ALL_HOUSES_BY_AGENCY+agency+`/${page}`
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
export const getHousesByGie = async(id,page)=>{
    try {
        const path = GET_ALL_HOUSES_BY_GIE+id+`/${page}`
        const response = await getAPI(path,true)
        console.log('response from get all houses by gie',response)
        return response
    } catch (error) {
        console.log('error in get all houses by gie',error)
    }
}
export const gethouselengthbygie = async(id)=>{
    try {
        const path = GET_GIE_HOUSE_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get gie house length',response)
        return response
    } catch (error) {
        console.log('error in get house length by gie',error)
    }
}
export const gethouselengthbyagency = async(id)=>{
    try {
        const path = GET_AGENCY_HOUSE_LENGTH+id
        const response = await getAPI(path,true)
        console.log('response from get agency house length',response)
        return response
    } catch (error) {
        console.log('error in get house length by agency',error)
    }
}