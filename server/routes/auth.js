let express = require("express"),
  router = express.Router();

let passport = require("../login/Github/passport").passport,
  tokenGenerator = require("../utils/tokenGenerator");

router.route("/login").get(
  passport.authenticate(
    "github",
    {
      failureRedirect: "/",
      scope: ["read:org", "repo"]
    },
    function(req, res) {
      res.json({
        user: {
          username: req.user.username,
          id: req.user.id,
          image_url: req.user.image_url,
          subscriptions: req.user.subscriptions
        }
      });
    }
  )
);

router.route("/logout").get(function(req, res, next) {
  tokenGenerator.clearAuthCookie(res);
  req.logout();
  res.redirect("/");
});

router
  .route("/callback")
  .get(passport.authenticate("github", { failureRedirect: "/" }), 
  function(req, res) {
    tokenGenerator.setAuthCookie(req, res);
    res.redirect("/");
  });

module.exports = router;
