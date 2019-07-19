let express = require("express"),
  router = express.Router();

let invalidXhubSignature = require("../../utils/tokenGenerator").invalidXhubSignature,
  subscriptionOperator = require("../../model/helpers/subscriptions"),
  User = require("../../model/User"),
  admin = require("../../firebase/firebase").admin,
  firebaseUtils = require("../../utils/firebaseNotifications"),
  newsOperator = require('../../model/helpers/news');

router
  .route("/")

  .get(function(req, res, next) {
    newsOperator.getNews(req.user.id)
    .then((news) => {
      res.json(news)
    })
    .catch((e) => next(e))
  })

  .put(function(req, res, next){
    let userId = req.user.id;
    let urlSeen = req.body.url

    newsOperator.newsSeen(userId, urlSeen)
    .then((news) => res.json([...news]))
    .catch(e => next(e))
  })

  .post(function(req, res, next) {
    subscriptionOperator
      .saveFirebaseToken(req.user.id, req.body.token)
      .then(user => {
        res.status(204).send();
      })
      .catch(e => next(e));
  });

router.route("/callback")
.post(function(req, res, next) {
  if (invalidXhubSignature(req)) {
    res.status(403);
    return next(new Error("invalid X-Hub signature"));
  }
  //initial req. after subscription - no action
  let pingEvent = req.body.zen;
  if (pingEvent) {
    res.status(204);
    return res.send();
  }

  let userId = req.body.sender.id;
  User.findOne({ id: userId })
    .then(user => {
      if (user) {
        let token = user.firebase_token;
        let message = firebaseUtils.getMessage(req.body, token);
        admin
          .messaging()
          .send(message)
          .then(() => newsOperator.saveNews(req.body))
          .then((news) => {
            res.status(204);
            res.send();
          })
          .catch(error => {
            return next(error);
          });
      }
    })
    .catch(e => next(e));
});

module.exports = router;
