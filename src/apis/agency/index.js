import { deleteAPI } from "apis"
import { putAPI } from "apis"
import { getAPI } from "apis"
import { postAPI } from "apis"
import { UPLOAD_IMAGE_AGENCY } from "apis/apiurls"
import { GET_RECENT_AGENCIES } from "apis/apiurls"
import { GET_SINGLE_AGENCY } from "apis/apiurls"
import { UPDATE_AGENCY_DETAILS } from "apis/apiurls"
import { DELETE_AGENCY } from "apis/apiurls"
import { GET_ALL_AGENCY_NAMES } from "apis/apiurls"
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
export const getAllAgencies = async(GieId,page)=>{
    try {
        const path = GIES_AGENCY+GieId+`/${page}`
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
export const getAllAgenciesNames = async(id)=>{
    try {
        const path = GET_ALL_AGENCY_NAMES+id
        const response = await getAPI(path,true)
        console.log('response from get all agency names',response)
        return response
    } catch (error) {
        console.log('error in get all agencies names',error)
    }
}
export const updateAgencyDetails = async(body,id)=>{
    try {
        const path = UPDATE_AGENCY_DETAILS+id
        const response = await putAPI(path,body,true)
        console.log('this is the response from update agency details',response)
        return response
    } catch (error) {
        console.log('this is the error in update agency details', error)
    }
}
export const updateAgencyImage = async(body)=>{
    try {
        const response = await postAPI(UPLOAD_IMAGE_AGENCY,body,true)
        console.log('response from update agency image',response)
        return response
    } catch (error) {
        console.log('error in update agency image ',error)
    }
}
export const getsingleagency = async(id)=>{
    try {
        const path = GET_SINGLE_AGENCY+id
        const response = await getAPI(path,true)
        console.log('response from get single agency',response)
        return response
    } catch (error) {
        console.log('error in get single agency',error)
    }
}
export const getRecentAgenciesforGie = async(id)=>{
    try {
        const path = GET_RECENT_AGENCIES+id
        const response = await getAPI(path,true)
        console.log('response from get recent agencies by gie',response)
        return response
    } catch (error) {
        console.log('error in get recent agencies for gie',error)
    }
}