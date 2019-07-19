import React from "react";
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from "reactstrap";

import LogoutButton from "../Login/LogoutButton";
import { logOut } from "../Login/loginActions";

const UserOptions = props => {
  const { user } = props.login;
  let dispatchLogout = () => props.dispatch(logOut);
  let style = getStyle();

  return (
    <UncontrolledButtonDropdown style={style}>
      <DropdownToggle style={style} caret>
        {user.username}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem key="logoutButton">
          <LogoutButton logOut={dispatchLogout} />
        </DropdownItem>
        <DropdownItem key="settings">settings</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};

const getStyle = () => {
  return {
    backgroundColor: "transparent",
    border: "none",
    color: "black"
  };
};

export default UserOptions;
