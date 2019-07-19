import axios from "axios";
import firebase from "firebase";

import { firebase_msg_id } from "../../config";
import { messageReceived } from './notificationActions'
import { fetchNews } from '../News/newsActions'

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: firebase_msg_id
  });
};

export const activateNotifications = url => {
  let messaging = firebase.messaging();
  return messaging
    .requestPermission()
    .then(() => sendTokenWhenRefreshed(url)) 
}


export const activateNotificationsAndSendToServer = url => {
  let messaging = firebase.messaging();

  return messaging
    .requestPermission()
    .then(() => getTokenAndSendToServer(messaging, url))
};

const getTokenAndSendToServer = (messaging, url) => {
  messaging.getToken().then(token => {
    sendTokenWhenRefreshed(url);
    return sendTokenToServer(url, token);
  });
};

export const sendTokenWhenRefreshed = (url) => {
  const messaging = firebase.messaging()
  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then(refreshedToken => sendTokenToServer(url, refreshedToken))
      .catch(err => console.log("error in refresh token action"));
  });
};

const sendTokenToServer = (url, token) => {
  return axios.post(url, {
    token: token
  });
};

//when user clicks notification or when app is in focus
//TODO find a better solution than sending in dispatch? 
export const activateOnMessage = (dispatch) => {
let messaging = firebase.messaging();
  messaging.onMessage((payload) => {
    dispatch(messageReceived(payload))
    dispatch(fetchNews)
  })
};
