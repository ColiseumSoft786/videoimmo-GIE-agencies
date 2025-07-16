import { deleteAPI } from "apis"
import { putAPI } from "apis"
import { postAPI } from "apis"
import { getAPI } from "apis"
import { GET_OTHER_USERS_NAMES } from "apis/apiurls"
import { GET_SINGLE_USER } from "apis/apiurls"
import { GET_ALL_GIE_USER_NAMES } from "apis/apiurls"
import { GET_ALL_USERS_NAMES_BY_AGENCY } from "apis/apiurls"
import { EDIT_USER_BY_AGENCY } from "apis/apiurls"
import { DELETE_USER_BY_AGENCY } from "apis/apiurls"
import { ADD_USER_BY_AGENCY } from "apis/apiurls"
import { GET_ALL_GIE_USERS } from "apis/apiurls"
import { GET_ALL_AGENCY_USERS } from "apis/apiurls"

export const getAllUsersByAgencyId = async(id,page)=>{
    try {
        const path = GET_ALL_AGENCY_USERS+id+`/${page}`
        const response = await getAPI(path,true)
        console.log('response from get user by agency id',response)
        return response
    } catch (error) {
        console.log("error in get all users by  agency id",error)
    }
}
export const getAllUserByGieId = async(id,page)=>{
    try {
        const path = GET_ALL_GIE_USERS+id+`/${page}`
        const response = await getAPI(path,true)
        console.log("response from get all user by gie id ",response)
        return response
    } catch (error) {
        console.log("error in the get all users by gie id ",error)
    }
}
export const addUser = async(body)=>{
    try {
        const response = await postAPI(ADD_USER_BY_AGENCY,body,true)
        console.log('response from add user',response)
        return response
    } catch (error) {
        console.log('error in add user',error)
    }
}
export const deleteUser = async(id)=>{
    try {
        const path = DELETE_USER_BY_AGENCY+id
        const response = await deleteAPI(path,{},true)
        console.log('response from delete user',response)
        return response
    } catch (error) {
        console.log('error in delete user',error)
    }
}
export const updateUser = async(body,id)=>{
    try {
        const path = EDIT_USER_BY_AGENCY+id
        const response = await putAPI(path,body,true)
        console.log('response from update user',response)
        return response
    } catch (error) {
        console.log('error in update user',error)
    }
}
export const getAllUsersNamesByAgency = async(id)=>{
    try {
        const path = GET_ALL_USERS_NAMES_BY_AGENCY + id
        const response = await getAPI(path,true)
        console.log('response from get all users names by agency',response)
        return response
    } catch (error) {
        console.log('error in get all user names by agency',error)
    }
}
export const getOtherUserNames = async(id,agency)=>{
    try {
        const path = GET_OTHER_USERS_NAMES+id+`/${agency}`
        const response = await getAPI(path,true)
        console.log('response from get other user names ',response)
        return response
    } catch (error) {
        console.log('error in get other user name ',error)
    }
}
export const getAllGieUsernames = async(id)=>{
    try {
        const path = GET_ALL_GIE_USER_NAMES+id
        const response = await getAPI(path,true)
        console.log('response from get all gie user names',response)
        return response
    } catch (error) {
        console.log('error in get all gie user names',error)
    }
}
export const getsingleuserbygie = async(id)=>{
    try {
        const path = GET_SINGLE_USER+id
        const response = await getAPI(path,true)
        console.log('response from get single user',response)
        return response
    } catch (error) {
        console.log('error in get all single user',error)
    }
}