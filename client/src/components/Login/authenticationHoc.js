import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchApiAndUpdateLocalStorage } from "../NavBar/NavBarActions";
import { logIn } from './loginActions'
import { getLoginStatus } from "../../localStorage/login";
import { getApi } from "../../localStorage/api";
import NavBar from "../NavBar/NavBarContainer";
import { activate } from "../PushNotifications/notificationActions";

const localStorageApi = getApi(); 
const userLoggedIn = getLoginStatus();

export default function authorizationHoc(ChildComponent) {
  class Authentication extends Component {
    componentDidMount() {
      const { dispatch, navigation, login } = this.props;

      const shouldFetchApi = !navigation.api && !localStorageApi;
      const shouldFetchLoginDetails = userLoggedIn && !login.user;

      if (shouldFetchApi) {
        dispatch(fetchApiAndUpdateLocalStorage);
      }

      if (shouldFetchLoginDetails) {
        const userUrl = localStorageApi.user;
        dispatch(logIn(userUrl));
      }
    }

    componentDidUpdate(prevProps) {
      const { dispatch, login, notifications } = this.props;
      const { user } = login;

      const shouldRedirectToLogin =
        !prevProps.login.loading && this.props.login.loading;

      const shouldActivateNotifications =
        user && Notification.permission === "granted" && !notifications.activated;

      if (shouldRedirectToLogin) {
        let loginUrl = getApi().login;
        window.location = loginUrl;
      }

      if (shouldActivateNotifications) {
          dispatch(activate);
      }
    }

    render() {
      const { user } = this.props.login;

      return (
        <div>
          <NavBar {...this.props} />
          {user ? <ChildComponent {...this.props} /> : null}
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    const { login, navigation, notifications } = state;
    return { login, navigation, notifications };
  }

  return connect(mapStateToProps)(Authentication);
}
