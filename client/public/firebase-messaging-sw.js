importScripts('https://www.gstatic.com/firebasejs/5.8.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.5/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "973544144636"  
});
//msg id needs to be hard coded. 
//Getting error if importing string from other file.
//TODO: set as env variable at production. Will not work in dev mode. 
//TODO: import public vapid key from config file instead.
const messaging = firebase.messaging()


messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
      body: 'Background Message body.'
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
