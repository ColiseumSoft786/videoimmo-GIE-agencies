import { configureStore } from '@reduxjs/toolkit';
import organizationReducer from './OrganizationSlice'
import geiReducer from './GEISlice'
import loginReducer from './LoginSlice'

const store = configureStore({
  reducer:{
    organization:organizationReducer,
    gei:geiReducer,
    login:loginReducer
  }
});

export default store;