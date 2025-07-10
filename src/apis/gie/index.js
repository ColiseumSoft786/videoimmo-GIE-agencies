import { getAPI } from "apis"
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