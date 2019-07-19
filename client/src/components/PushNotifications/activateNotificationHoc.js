import React from "react";
import { connect } from "react-redux";

import { activateAndSaveToken } from "./notificationActions";
import NotificationsButton from "./NotificationsButton";

const firebaseHoc = (ChildComponent) => {
  const Firebase = (props) => {

      const { dispatch } = props
      const { activated } = props.notifications;

      return activated ? (
        <ChildComponent {...props} />
      ) : (
        <NotificationsButton
          activateNotifications={() => activate(dispatch)}
        />
      );
    
  }

  const mapStateToProps = state => {
    const { navigation, notifications } = state;
    return { navigation, notifications };
  };
  
  let activate = (dispatch) => {
    dispatch(activateAndSaveToken);
  };

  return connect(mapStateToProps)(Firebase);
}

export default firebaseHoc
