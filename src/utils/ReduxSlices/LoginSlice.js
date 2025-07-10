import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isloggedin:true,
    otp:null,
    isGie:false,
    isAgency:false,
    searchText:''
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
        },
        setsearchtext:(state,action)=>{
            state.searchText = action.payload
        }
    }
})
export const {setisLoggedin,setisgie,setisagency,setsearchtext}=LoginSlice.actions
export default LoginSlice.reducer