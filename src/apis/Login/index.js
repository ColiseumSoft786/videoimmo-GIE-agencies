import { postAPI } from "apis"
import { getAPI } from "apis"
import { AGENCY_USER_LOGIN } from "apis/apiurls"
import { GIE_USER_LOGIN } from "apis/apiurls"
import { GIE_SEND_OTP } from "apis/apiurls"
import { AGENCY_SEND_OTP } from "apis/apiurls"

export const sendAgencyOtp = async(body)=>{
    try {
        const response = await postAPI(AGENCY_SEND_OTP,body,false)
        console.log('response from agency send otp',response)
        return response
    } catch (error) {
        console.log('error in send otp ',error)
    }
}
export const sendGieOtp = async(body)=>{
    try {
        const response = await postAPI(GIE_SEND_OTP,body,false)
        console.log('response from gie send otp',response)
        return response
    } catch (error) {
        console.log('error in send otp ',error)
    }
}
export const loginGIE = async(body)=>{
    try {
        const response = await postAPI(GIE_USER_LOGIN,body,false)
        console.log('response from gie login',response)
        return response
    } catch (error) {
        console.log('error in login gie',error)
    }
}
export const loginAgency = async(body)=>{
    try {
        const response = await postAPI(AGENCY_USER_LOGIN,body,false)
        console.log('response from agency login',response)
        return response
    } catch (error) {
        console.log('error in login agency',error)
    }
}