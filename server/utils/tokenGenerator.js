let jwt = require("jsonwebtoken"),
  crypto = require("crypto"),
  model = require("../resources/model").model;

const generateJwt = id => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: {
        userId: id
      }
    },
    process.env.JWT_SECRET
  );
};

const formatOauthToken = accessToken => {
  return "token " + accessToken;
};

const setAuthCookie = (req, res) => {
  let newJwt = generateJwt(req.user.id);

  res.cookie("authorization", newJwt, {
    httpOnly: true,
    secure: true
  });
};

const clearAuthCookie = res => {
  res.clearCookie("authorization", {
    httpOnly: true,
    secure: true
  });
};

//src: https://kiewic.com/validate-x-hub-signatue
const getXhubHmacSignature = payload => {
  let hmac = crypto.createHmac("sha1", process.env.HUB_SECRET);
  hmac.update(JSON.stringify(payload), "utf-8");
  return "sha1=" + hmac.digest("hex");
};

//TODO place this logic in middleware instead
const invalidXhubSignature = req => {
  let compareWith = getXhubHmacSignature(req.body);
  let header = req.header("X-Hub-Signature");
  return !header === compareWith;
};

module.exports = {
  generateJwt: generateJwt,
  formatOauthToken: formatOauthToken,
  setAuthCookie: setAuthCookie,
  clearAuthCookie: clearAuthCookie,
  invalidXhubSignature: invalidXhubSignature
};
