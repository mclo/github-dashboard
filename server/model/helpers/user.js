let User = require("../User");

const createOrUpdateAccount = (profile, accessToken) => {
  let userObject = createUserObject(profile, accessToken);

  return User.countDocuments({ id: profile.id }).then(count => {
    let cb = userExists(count)
      ? getUpdatedUser(userObject)
      : getNewUser(userObject);
    return cb.then(user => user);
  });
};

const userExists = documentAmount => {
  return documentAmount > 0;
};

const getNewUser = userObject => {
  let user = new User(userObject);
  return user.save();
};

const getUpdatedUser = userObject => {
  return User.findOneAndUpdate({ id: userObject.id }, userObject);
};

const createUserObject = (profile, accessToken) => {
  return {
    id: profile.id,
    username: profile._json.login,
    image_url: profile._json.avatar_url,
    access_token: accessToken,
    email: profile._json.email,
  };
};

const getUser = id => {
  return User.findOne({ id: id });
};

module.exports = {
  createOrUpdateAccount: createOrUpdateAccount,
  getUser: getUser
};
