let axios = require("axios"),
  express = require("express"),
  router = express.Router({ mergeParams: true }),
  subscriptionOperator = require("../../model/helpers/subscriptions"),
  userOperator = require("../../model/helpers/user"),
  tokenGenerator = require("../../utils/tokenGenerator"),
  formatToken = tokenGenerator.formatOauthToken,
  hookOperator = require("../../utils/webhookUtils"),
  navigation = require("../../utils/navigation"),
  callbackUrl = require("../../config/environment/index")
    .notifications_callback;

router
  .route("/")
  .get(function(req, res, next) {
    let hookId = req.params.hook_id;

    subscriptionOperator.getSub(hookId).then(subscription => {
      let events = hookOperator.getEventOptions();
      res.json({
        options: events,
        subscription: subscription
      });
    });
  })
  .put(function(req, res, next) {
    let hookId = req.params.hook_id;
    let owner = req.params.owner;
    let repo = req.params.repo;
    let events = req.body.events;
    let url = navigation.getEditHookUrl(owner, repo, hookId);

    let configuredEvents = hookOperator.getWebhookEvents([...events]);
    let token = formatToken(req.user.access_token);

    axios({
      method: "patch",
      url: url,
      headers: { Authorization: token },
      data: {
        events: configuredEvents,
        config: {
          url: callbackUrl,
          content_type: "json",
          secret: process.env.HUB_SECRET
        }
      }
    })
      .then(response => {
        const newEvents = hookOperator.configureEventsForClient(
          response.data.events
        );
        return subscriptionOperator.updateSubscriptionEvents(
          response.data.id,
          newEvents
        );
      })
      .then(() => {
        userOperator.getUser(req.user.id).then(user => {
          let subscription = hookOperator.getCurrentSubscription(
            user.subscriptions.slice(),
            hookId
          );
          let options = hookOperator.getEventOptions();
          res.json({
            options: options,
            subscription: subscription
          });
        });
      })
      .catch(e => next(e));
  })
  .delete(function(req, res, next) {
    let owner = req.params.owner;
    let repo = req.params.repo;
    let hookId = req.params.hook_id;

    let url = navigation.getEditHookUrl(owner, repo, hookId);
    let token = formatToken(req.user.access_token);

    axios({
      method: "delete",
      url: url,
      headers: { Authorization: token }
    })
      .then(response => {
        return subscriptionOperator.removeHook(hookId);
      })
      .then(() => {
        res.status(204);
        res.send();
      })
      .catch(e => next(e));
  });

module.exports = router;
