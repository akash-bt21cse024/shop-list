const users = require("../model/user.model");
const jwt = require("jsonwebtoken");
const secretkey = "uififgjiogifjdogth";

// function for signup
const signup = async (req, res) => {
  try {
    const { name, email, password, number } = req.body;
    const flag = await users.findOne({ number });
    console.log("-------------------------------------------", req.body);
    if (!flag) {
      const user = new users({ name, email, password, number });
      await user.save();
      res.status(201).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        data: { errorMessage: "it is already in user" },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: { errorMessage: "it is fail to signup" },
    });
    console.log("this is err--", err);
  }
};

// function for login
const login = async (req, res) => {
  try {
    const user = await users.findOne({ number: req.body.number });
    
    if (!user) {
      res.status(401).json({
        status: "fail",
        data: { errorMessage: "wrong number" },
      });
    } else if (user.password !== req.body.password) {
      res.status(401).json({
        status: "fail",
        data: { errorMessage: "wrong name" },
      });
    } else {
      const token = jwt.sign({ _id: user._id }, secretkey);
      res.status(200).json({
        status: "success",
        data: { token },
      });
    }
  } catch (err) {
    res.status(401).json({
      status: "fail",
      data: { errorMessage: "it is fail to login" },
    });
    console.log("this is err--", err);
  }
};
module.exports = { signup, login };
