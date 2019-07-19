let admin = require("firebase-admin");
let serviceAccount = require("../config/service_account.json");

const initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FCM_DATABASE
  });
};

module.exports = {
  initializeFirebase: initializeFirebase,
  admin: admin
};
