import { deleteAPI } from "apis"
import { putAPI } from "apis"
import { getAPI } from "apis"
import { postAPI } from "apis"
import { DELETE_AGENCY } from "apis/apiurls"
import { UPDATE_AGENCY } from "apis/apiurls"
import { GIES_AGENCY } from "apis/apiurls"
import { ADD_AGENCY } from "apis/apiurls"

export const addAgency = async(body) =>{
    try {
        const response = await postAPI(ADD_AGENCY,body,true)
        console.log('response from get agencies')
        return response
    } catch (error) {
        console.log('error in get agencies',error)
    }
}
export const getAllAgencies = async(GieId)=>{
    try {
        const path = GIES_AGENCY+GieId
        const response = await getAPI(path,true)
        console.log('response from get all agencies',response)
        return response
    } catch (error) {
        console.log('error in get all agencies',error)
    }
}
export const deleteAgency = async(id)=>{
    try {
        const path = DELETE_AGENCY+id
        const response = await deleteAPI(path,{},true)
        console.log('response from delete agency',response)
        return response
    } catch (error) {
        console.log('error in delete agency',error)
    }
}
export const updateAgency = async(body,id)=>{
    try {
        const path = UPDATE_AGENCY+id
        const response = await putAPI(path,body,true)
        console.log('response from update agency',response)
        return response
    } catch (error) {
        console.log('error in update agency ',error)
    }
}