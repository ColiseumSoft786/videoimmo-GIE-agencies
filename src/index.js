import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import App from "App";
import { Provider } from "react-redux";
import store from "utils/ReduxSlices/store";

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
   <App/>
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);
