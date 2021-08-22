const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
   const { email, password } = req.body;  
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    console.log("user", token); 
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    return res.status(200).send({
      token,
      id: user._id,
      name: user.pseudo,
      email: user.email,
      picture: user.picture,
      following: user.following,
      followers: user.followers,
      likers: user.likers,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    // const errors = signInErrors(err);
    res.status(200).json({ err });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
