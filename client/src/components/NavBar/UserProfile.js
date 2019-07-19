import React from "react";
import { connect } from "react-redux";

import {
  Nav,
  NavItem
} from "reactstrap";



import UserOptions from "./UserOptions"
import UserImage from "./UserImage"
import News from "../News/NewsButton";

const UserProfile = props => {
  const { user } = props.login;
  let userImage = user && user.image_url;

  return (
    <Nav>
      <NavItem>
        <News />
      </NavItem>
      <NavItem>
        <UserOptions {...props}/>
      </NavItem>
      <NavItem>
        <UserImage image={userImage}/>
      </NavItem>
    </Nav>
  );
};


const mapStateToProps = state => {
  const { notifications } = state;
  return { notifications };
};

export default connect(mapStateToProps)(UserProfile);
