const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../JWT");
const validateInputs = require("../validation");

exports.register = async (req, res) => {
  const { errors, isValid } = validateInputs(req.body.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { name, email, password } = req.body.body;

  try {
    await User.findOne({ email: email }).then(async (user) => {
      if (user) {
        return res.status(400).json({ email: "Email Already Exists" });
      }
      const newUser = new User({
        name: name,
        email: email,
        password: password,
      });
      await newUser
        .save()
        .then((usr) => res.json(usr))
        .catch((err) => console.log(err));
    });
  } catch (err) {
    return res.status(400).json({ email: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { errors, isValid } = validateInputs(req.body.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body.body;
  try {
    await User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        return res.status(400).json({
          emailnotfound: "User Not Exist",
        });
      }
      await bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({
            passwordincorrect: "Email or Password wrong!",
          });
        }
        const token = jwt.generateAccessToken(user);
        res.status(200).json({
          success: true,
          token: "Bearer " + token,
        });
      });
    });
  } catch (err) {
    return res.status(400).json({ emailnotfound: "Server Error" });
  }
};
