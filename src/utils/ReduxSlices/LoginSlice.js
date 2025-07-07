import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isloggedin:true,
    otp:null,
    isGie:false,
    isAgency:false,
}
const LoginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        setisLoggedin:(state,action)=>{
            state.isloggedin=action.payload
        },
        setotp:(state,action)=>{
            state.otp = action.payload
        },
        setisgie:(state,action)=>{
            state.isGie=action.payload
        },
        setisagency:(state,action)=>{
            state.isAgency=action.payload
        }
    }
})
export const {setisLoggedin,setisgie,setisagency}=LoginSlice.actions
export default LoginSlice.reducer