import { putAPI } from "apis"
import { getAPI } from "apis"
import { GET_GIE_TOKENS_TRANSACTION } from "apis/apiurls"
import { UPDATE_GIE_DETAILS } from "apis/apiurls"
import { GET_GIE_TOKENS } from "apis/apiurls"

export const getgietokens = async(id)=>{
    try {
        const path = GET_GIE_TOKENS+id
        const response = await getAPI(path,true)
        console.log('response from gie get tokens')
        return response
    } catch (error) {
        console.log('error in get gie tokens',error)
    }
}
export const getGieTokenHistory = async(id)=>{
    try {
        const path = GET_GIE_TOKENS_TRANSACTION+id
        const response = await getAPI(path,true)
        console.log('response fro get gie token history',response)
        return response
    } catch (error) {
        console.log('error in get gie token history',error)
    }
}
export const updateGieDetails = async(body,id)=>{
    try {
        const path = UPDATE_GIE_DETAILS+id
        const response = await putAPI(path,body,true)
        console.log('response from update gie details ',response)
        return response
    } catch (error) {
        console.log('error in update gie details',error)
    }
}