let express = require("express"),
  router = express.Router({ mergeParams: true }),
  axios = require("axios"),
  releasesUrl = require("../../resources/model").gh_api.releases;
formatToken = require("../../utils/tokenGenerator").formatOauthToken;

router.route("/").get(function(req, res) {
  let owner = req.params.owner;
  let repo = req.params.repo;

  let url = releasesUrl.replace("{owner}", owner).replace("{repo}", repo);
  let token = formatToken(req.user.access_token);

  axios({
    method: "get",
    url: url,
    headers: { Authorization: token }
  })
    .then(response => {
      res.json({
        repos: response.data
      });
    })
    .catch(e => next(e));
});

module.exports = router;
