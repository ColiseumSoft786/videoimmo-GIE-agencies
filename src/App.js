import React, { useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Maps from "views/admin/Maps.js";
import Users from "views/admin/Users";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setisLoggedin } from "utils/ReduxSlices/LoginSlice";
import { setisgie } from "utils/ReduxSlices/LoginSlice";
import { setisagency } from "utils/ReduxSlices/LoginSlice";
import Agencies from "views/admin/Agencies";
import Teams from "views/admin/Teams";
import EditTeamModal from "views/Modals/EditTeamModal";
import House from "views/admin/House";
import './App.css'

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.login.isloggedin);
  const isGie = useSelector((state)=>state.login.isGie)
  const isAgency = useSelector((state)=>state.login.isAgency)
  const syncUserTypeFromLocalStorage = () => {
  const gieName = localStorage.getItem("giename");
  const agencyName = localStorage.getItem("agencyname");
  if (gieName) {
    dispatch(setisgie(true));
    dispatch(setisagency(false));
  } else if (agencyName) {
    dispatch(setisagency(true));
    dispatch(setisgie(false));
  } else {
    dispatch(setisgie(false));
    dispatch(setisagency(false));
  }
};

  // Sync Redux with localStorage initially and on route change
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    dispatch(setisLoggedin(loginStatus));
    syncUserTypeFromLocalStorage()
  }, [location, dispatch]);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn && !location.pathname.startsWith("/auth")) {
      history.replace("/auth/login");
      console.log("Redirecting to login");
    }
  }, [isLoggedIn, location.pathname, history]);

  return (
    <>
      <ToastContainer />
      <Switch>
        {/* Admin layout pages */}
        <Route path="/dashboard" exact render={() => <Admin children={<Dashboard />} />} />
        <Route path="/settings" exact render={() => <Admin children={<Settings />} />} />
        <Route path="/tables" exact render={() => <Admin children={<Tables />} />} />
        <Route path="/maps" exact render={() => <Admin children={<Maps />} />} />
        <Route path="/users/:page" exact render={() => <Admin children={<Users />} />} />
        <Route path='/users/agency/:agId/:page' exact render={()=><Admin children={<Users/>}/>}></Route>
        <Route path='/users/searched/:userid' exact render={()=><Admin children={<Users/>}/>}></Route>
        {isGie&&<Route path="/agencies/:page" exact render={() => <Admin children={<Agencies />} />} />}
        {isGie&&<Route path="/agencies/searched/:agid" exact render={() => <Admin children={<Agencies />} />} />}
        <Route path="/teams/:page" exact render={() => <Admin children={<Teams />} />} />
        <Route path="/teams/filtered/:agId/:page" exact render={() => <Admin children={<Teams />} />} />
        <Route path="/teams/searched/:teamid" exact render={() => <Admin children={<Teams />} />} />
        {/* <Route path="/teams/:agId" exact render={() => <Admin children={<Teams />} />} /> */}
        <Route path='/team/:id' exact render={()=><Admin children={<EditTeamModal/>}/>}></Route>
        <Route path='/houses/of/:userid/:username/:page' exact render={()=><Admin children={<House/>}/>}></Route>
        <Route path='/houses/:page' exact render={()=><Admin children={<House/>}/>}></Route>
        <Route path='/houses/:agId/:page' exact render={()=><Admin children={<House/>}/>}></Route>
        {/* Public and Auth pages */}
        <Route path="/auth" component={Auth} />
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />

        {/* Default redirect */}
        <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </>
  );
};

export default App;
