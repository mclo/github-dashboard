let express = require("express"),
  router = express.Router();

let notifications = require("./gh-api-routes/notifications"),
  auth = require("./auth"),
  api = require("./api"),
  user = require("./user"),
  org = require("./gh-api-routes/orgs"),
  repos = require("./gh-api-routes/repos"),
  issues = require("./gh-api-routes/issues"),
  subscribe = require("./gh-api-routes/subscribe"),
  updateSubscription = require("./gh-api-routes/webhook"),
  releases = require('./gh-api-routes/releases'),
  model = require("../resources/model").model,
  loginMiddleware = require("../middleware/verifyLogin");

router.use(model.api, api);
router.use(model.auth, auth);
router.use(model.notifications, notifications);

//routes with authentication middleware enabled
router.use(loginMiddleware);
router.use(model.user, user);
router.use(model.organizations, org);
router.use(model.repos, repos);
router.use(model.releases, releases)
router.use(model.issues, issues);
router.use(model.subscribe, subscribe),
router.use(model.update_subscription, updateSubscription);

module.exports = router;
