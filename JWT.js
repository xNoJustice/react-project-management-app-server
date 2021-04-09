const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, "TooSecretKey", { expiresIn: 31556926 });
}

module.exports = { generateAccessToken };
