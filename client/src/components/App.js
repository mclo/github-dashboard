import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import OrganizationsPage from "./Organizations/OrganizationContainer";
import authorizationHoc from "./Login/authenticationHoc";
import configureStore from "../configureStore";
import errorHandler from "./Error/errorHoc";

const store = configureStore();

class App extends Component {

  //Other components will not 
  //update properly without route here
  render() {
  const WrappedOrgs = authorizationHoc(OrganizationsPage);

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route path='/' component={errorHandler(WrappedOrgs)} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
