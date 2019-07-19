let express = require("express"),
  router = express.Router({ mergeParams: true }),
  repositoriesUrl = require("../../resources/model").gh_api.repositories_url,
  axios = require("axios"),
  formatToken = require("../../utils/tokenGenerator").formatOauthToken;

router.route("/").get(function(req, res, next) {
  let token = formatToken(req.user.access_token);
  let owner = req.params.owner;
  let url = repositoriesUrl.replace("{owner}", owner);
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
