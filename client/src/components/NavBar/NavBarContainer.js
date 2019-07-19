import React from "react";
import { Navbar, NavbarBrand, Nav } from "reactstrap";

import { rerouteToLogin } from "../Login/loginActions";
import LoginButton from "../Login/LoginButton";
import UserProfile from "./UserProfile";
import { getLoginStatus } from "../../localStorage/login";

const isLoggedIn = getLoginStatus();

const NavBar = props => {
  let renderComponent = getChildComponent(props);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Github Dashboard</NavbarBrand>
      <Nav className="ml-auto" navbar>
        {renderComponent}
      </Nav>
    </Navbar>
  );
};

const getChildComponent = props => {
  if (isLoggedIn && props.login.user) {
    return <UserProfile {...props} />;
  } else {
    const { navigation } = props;
    const loginUrl = navigation.api && navigation.api.login;
    const onClick = () => {
      return props.dispatch(rerouteToLogin);
    };

    const loginProps = {
      url: loginUrl,
      onClick: onClick
    };

    return <LoginButton {...loginProps} />;
  }
};

export default NavBar;
