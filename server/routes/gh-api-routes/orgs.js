let express = require("express"),
  router = express.Router(),
  jwt = require("jsonwebtoken"),
  axios = require("axios");

let formatToken = require("../../utils/tokenGenerator").formatOauthToken;
let api = require('../../resources/model').gh_api

router.route("/").get(function(req, res, next) {
  let url = api.user_organizations_url;
  let accessToken = req.user.access_token;
  let token = formatToken(accessToken);

  return axios({
    method: "get",
    url: url,
    headers: { Authorization: token }
  })
    .then(response => {
      return res.json({
        orgs: response.data,
        user: req.user
      });
    })
    .catch(error => {
      return next(error);
    });
});

module.exports = router;
