let express = require("express"),
  router = express.Router({ mergeParams: true }),
  axios = require("axios");

let formatToken = require("../../utils/tokenGenerator").formatOauthToken;
let navigation = require("../../utils/navigation");

router.route("/").get(function(req, res) {
  let token = formatToken(req.user.access_token);
  let owner = req.params.owner;
  let repo = req.params.repo;

  let url = navigation.getIssuesUrl(owner, repo);

  axios({
    method: "get",
    url: url,
    headers: { Authorization: token }
  })
    .then(response => {
      res.json({
        issues: response.data
      });
    })
    .catch(e => next(e));
});

module.exports = router;
