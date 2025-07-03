import { configureStore } from '@reduxjs/toolkit';
import organizationReducer from './OrganizationSlice'
import geiReducer from './GEISlice'

const store = configureStore({
  reducer:{
    organization:organizationReducer,
    gei:geiReducer,
  }
});

export default store;