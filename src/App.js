import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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

import { ToastContainer } from "react-toastify";
import Users from "views/admin/Users";
import Organizations from "views/admin/Organizations";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Switch>
        {/* Wrap pages in Admin layout */}
        <Route path="/dashboard" exact render={() => <Admin children={<Dashboard />} />} />
        <Route path="/settings" exact render={() => <Admin children={<Settings />} />} />
        <Route path="/tables" exact render={() => <Admin children={<Tables />} />} />
        <Route path="/maps" exact render={() => <Admin children={<Maps />} />} />
        <Route path="/users" exact render={() => <Admin children={<Users/>}/>}/>
        <Route path="/organizations" exact render={() => <Admin children={<Organizations/>}/>}/>
        {/* Auth layout and standalone pages */}
        <Route path="/auth" component={Auth} />
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />

        {/* Redirect default to dashboard */}
        <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </>
  );
};

export default App;
