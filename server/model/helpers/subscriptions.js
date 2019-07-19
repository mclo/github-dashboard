let User = require("../User");

const updateSubscriptionEvents = (hookId, events) => {
  return User.update(
    { "subscriptions.hook_id": hookId },
    {
      $set: {
        "subscriptions.$.events": events
      }
    }
  );
};

const getSub = hookId => {
  return User.findOne({ "subscriptions.hook_id": hookId }).then(user => {
    let sub = user.subscriptions.find(sub => sub.hook_id === Number(hookId));
    return sub;
  });
};

const addSubscription = (userId, newSub) => {
  return User.findOne({ id: userId }).then(user => {
    if (!newSub || !user || invalidContent(newSub)) {
      throw new Error("invalid input");
    }
    //TODO validate the entire object
    user.subscriptions.push(newSub);
    return user.save();
  });
};

const invalidContent = subscription => {
  return !subscription.hook_id;
};

const removeHook = hookId => {
  return User.update(
    { "subscriptions.hook_id": hookId },
    { $pull: { subscriptions: { hook_id: hookId } } },
    { safe: true },
    function(err, obj) {
      if (err) {
        throw new Error(err.message());
      } else {
        return obj;
      }
    }
  );
};

const saveFirebaseToken = (userId, token) => {
  return User.findOneAndUpdate(
    { id: userId },
    { firebase_token: token },
    { upsert: true }
  );
};

module.exports = {
  addSubscription: addSubscription,
  removeHook: removeHook,
  saveFirebaseToken: saveFirebaseToken,
  updateSubscriptionEvents: updateSubscriptionEvents,
  getSub: getSub
};
