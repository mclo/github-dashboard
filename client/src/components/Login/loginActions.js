import axios from "axios";

import { setLogin, setLogout } from "../../localStorage/login";
import { getApi } from '../../localStorage/api'
import { handleError } from '../Error/errorActions'

export const rerouteToLogin = dispatch => {
    setLogin();
    return dispatch(loginRequested());
};
  
  //auth hoc will redirect to login page whenever login is loading
  export const LOGIN_REQUESTED = "LOGIN_REQUESTED";
  export const loginRequested = () => {
    return {
      type: LOGIN_REQUESTED,
      loading: true
    };
  };
  
  export const LOGGED_IN = "LOGGED_IN";
  export const loggedIn = user => {
    return {
      type: LOGGED_IN,
      user: user,
      loading: false
    };
  };
  
  export const logIn = loginUrl => dispatch => {
    return axios(loginUrl).then(
      res => dispatch(loggedIn(res.data.user)),
      err => dispatch(handleError(err.response.status))
    )
  };
  
  export const logOut = (dispatch, getState) => {
    const logoutUrl = getApi().logout;
    return axios(logoutUrl)
    .then(res => {
      setLogout()
      dispatch(loggedOut())
    })
    .catch(err => dispatch(handleError(err.response.status)))
  };
  
  export const LOGGED_OUT = "LOGGED_OUT";
  const loggedOut = () => {
    return {
      type: LOGGED_OUT,
      receivedAt: Date.now()
    };
  };
  