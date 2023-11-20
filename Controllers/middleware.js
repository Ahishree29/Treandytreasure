const jwt = require("jsonwebtoken");
const jwtkey = "e-com";
function verification(req, res, next) {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split(" ")[1];

    jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.status(402).send({ result: "please provide valid token " });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "please add token with header" });
  }
}
module.exports = verification;
