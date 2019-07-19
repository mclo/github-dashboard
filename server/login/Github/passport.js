let passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy

let dbOperator = require('../../model/helpers/user'),
    User = require('../../model/User');

let setup = (cbUrl) => {
  passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: cbUrl
  },
  function(accessToken, refreshToken, profile, cb) {
    dbOperator.createOrUpdateAccount(profile, accessToken)
    .then((user) => {
      return cb(null, user);
    })
    .catch((err)=> {
      next(err);
    });    
  }
))

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user){
    if(err){
      return next(err);
    } else{
      cb(null, user);
    }
  });
})
}





  module.exports = {
    passport: passport, 
    setup: setup
  };

