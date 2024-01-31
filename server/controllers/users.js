const userSchema = require("../models/users");
const consts = require("../lib/helper/const");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { passwordValidator } = require("../lib/helper/common");

exports.getUsers = async (req, res) => {
  try {
    const users = await userSchema.find({}, { email: 0, password: 0 });
    res.status(consts.http.OK).send({
      message: "Success",
      usersCount: users.length,
      users: users,
    });
  } catch (error) {
    res.status(consts.http.INTERNAL_SERVER_ERROR).send({
      message: "Error",
      error: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(consts.http.NOT_FOUND).send({
        message: "Error",
        error: "No user found with the given id",
      });
    }

    // Decrypt the email
    user.email = decryptData(user.email);

    res.status(consts.http.OK).send({
      message: "Success",
      user: user,
    });
  } catch (error) {
    res.status(consts.http.INTERNAL_SERVER_ERROR).send({
      message: "Error",
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    let userBody = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    };

    // Validate the password
    if (!passwordValidator(userBody.password)) {
      return res.status(consts.http.BAD_REQUEST).send({
        message: "Error",
        error:
          "Password must contain at least 8 characters, 1 capital letter, 1 number, and 1 special character",
      });
    }
    userBody.password = await bcrypt.hash(userBody.password, 6);
    const user = new userSchema(userBody);
    await user.save();
    res.status(consts.http.CREATED).send({
      message: "Success",
      user: user,
    });
  } catch (error) {
    res.status(consts.http.INTERNAL_SERVER_ERROR).send({
      message: "Error",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Assuming you have a mongoose model named 'userSchema'
    const user = await userSchema.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(consts.http.NOT_FOUND).send({
        message: "Error",
        error: "No user found with the given email",
      });
    }

    let passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      // Use the correct status code (e.g., consts.http.UNAUTHORIZED for authentication failures)
      return res
        .status(consts.http.UNAUTHORIZED)
        .json({ message: "Please check your credentials" });
    }

    console.log(passwordCompare);

    // It seems like 'id' is not defined. You might want to use 'user._id' or another user identifier.
    const token = jwt.sign({ id: user._id }, "userLogin");

    res.status(consts.http.OK).send({ message: "Login success", token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(consts.http.NOT_FOUND).send({
        message: "Error",
        error: "No user found with the given id",
      });
    }

    // If the password is being updated, validate it and encrypt it
    if (data.password && data.password !== user.password) {
      // Validate the password
      if (!passwordValidator(data.password)) {
        return res.status(consts.http.BAD_REQUEST).send({
          message: "Error",
          error:
            "Password must contain at least 8 characters, 1 capital letter, 1 number, and 1 special character",
        });
      }

      // Encrypt the password
      data.password = encyptData(data.password);
    }

    // If the email is being updated, encrypt it
    if (data.email && data.email !== user.email) {
      // Encrypt the email
      data.email = encyptData(data.email);
    }

    // Update the user
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    res.status(consts.http.OK).send({
      message: "Success",
      user: updatedUser,
    });
  } catch (error) {
    res.status(consts.http.INTERNAL_SERVER_ERROR).send({
      message: "Error",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(consts.http.NOT_FOUND).send({
        message: "Error",
        error: "No user found with the given id",
      });
    }

    const deleteUser = await userSchema.findByIdAndDelete(req.params.id);
    res.status(consts.http.OK).send({
      message: "Success",
      user: deleteUser,
    });
  } catch (error) {
    res.status(consts.http.INTERNAL_SERVER_ERROR).send({
      message: "Error",
      error: error.message,
    });
  }
};
