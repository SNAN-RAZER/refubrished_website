const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const userModel = require("../../models/userModel");

dotenv.config();

//Register function
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //Check if user already exits
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(401).send({
        success: false,
        message: "User already exists",
      });
    } else {
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);
      req.body.password = hashPassword;

      const newUser = new userModel(req.body);

      await newUser.save();

      return res.status(201).send({
        success: true,
        message: "User created successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Login function
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Check if user doesn't exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    } else {
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({
          success: false,
          message: "Invalid password",
        });
      } else {
        // if user is active

        if (user.status !== "active") {
          throw new Error("The user account is blocked, please contact admin");
        }

        //Create and assign token

        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "365d",
        });

        return res.status(200).send({
          success: true,
          message: "User found",
          data: token,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

// Get user Data

const getUSerData = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    return res.status(200).send({
      success: true,
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

// Get al users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).send({
      success: true,
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

// Update user status

const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await userModel.findByIdAndUpdate(req.params.id, { status });
    return res.status(201).send({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

module.exports = {
  registerUser,
  userLogin,
  getUSerData,
  getAllUsers,
  updateUserStatus,
};
