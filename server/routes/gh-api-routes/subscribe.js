let axios = require("axios"),
  express = require("express"),
  router = express.Router({ mergeParams: true }),
  subscriptionOperator = require("../../model/helpers/subscriptions"),
  tokenGenerator = require("../../utils/tokenGenerator"),
  formatToken = tokenGenerator.formatOauthToken,
  hooksOperator = require("../../utils/webhookUtils"),
  navigation = require("../../utils/navigation"),
  callbackUrl = require("../../config/environment/index")
    .notifications_callback;

let eventOptions = hooksOperator.getEventOptions();

router
  .route("/")
  .get(function(req, res, next) {
    res.json({
      options: eventOptions
    });
  })
  .post(function(req, res, next) {
    let owner = req.params.owner;
    let repo = req.params.repo;
    let ghUrl = navigation.getAddHookUrl(owner, repo);

    let config = {
      url: callbackUrl,
      content_type: "json",
      secret: process.env.HUB_SECRET,
      insecure_url: process.env.SECURE_URL
    };

    //will activate all events as default
    let configuredEvents = hooksOperator.getWebhookEvents(eventOptions);
    let options = {
      config: config,
      events: configuredEvents,
      active: true
    };

    let token = formatToken(req.user.access_token);
    axios({
      method: "post",
      url: ghUrl,
      headers: { Authorization: token },
      data: options
    })
      .then(response => {
        let data = response.data;
        let hookId = data.id;

        let newSub = {
          events: eventOptions,
          hook_id: hookId,
          url: data.url,
          repo_name: repo,
          owner: owner
        };

        subscriptionOperator.addSubscription(req.user.id, newSub).then(user => {
          let subscription = hooksOperator.getCurrentSubscription(
            user.subscriptions.slice(),
            hookId
          );

          return res.json({
            subscription: subscription,
            options: eventOptions
          });
        });
      })
      .catch(e => next(e));
  });

module.exports = router;
