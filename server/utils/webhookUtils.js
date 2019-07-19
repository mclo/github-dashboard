const editHookUrl = require("../resources/model").gh_api.edit_hook;

const getEventOptions = () => {
  return ["issues", "commit", "release"];
};

const getWebhookEvents = events => {
  let newArray = [];
  events.forEach(event => {
    if (event === "commit") {
      newArray.push("commit_comment");
    }
    if (event === "issues" || event === "release") {
      newArray.push(event);
    }
  });

  return newArray;
};

const getCurrentSubscription = (subscriptions, hookId) => {
  let hook_id = parseInt(hookId);
  let currentSub = subscriptions.find(sub => hook_id === sub.hook_id);
  return currentSub;
};

const configureEventsForClient = events => {
  let newArray = [];
  events.forEach(event => {
    if (event === "commit_comment") {
      newArray.push("commit");
    }
    if (event === "issues" || event === "release") {
      newArray.push(event);
    }
  });

  return newArray;
};

module.exports = {
  getEventOptions: getEventOptions,
  getWebhookEvents: getWebhookEvents,
  getCurrentSubscription: getCurrentSubscription,
  configureEventsForClient: configureEventsForClient
};
