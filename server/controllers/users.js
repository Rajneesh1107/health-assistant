const userSchema = require("../models/users");
const consts = require("../lib/helper/const");
const {
  encyptData,
  decryptData,
  passwordValidator,
  hashedPassword,
} = require("../lib/helper/common");

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
  try {
    let body = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    };

    // Validate the password
    if (!passwordValidator(body.password)) {
      return res.status(consts.http.BAD_REQUEST).send({
        message: "Error",
        error:
          "Password must contain at least 8 characters, 1 capital letter, 1 number, and 1 special character",
      });
    }

    // hashed the password
    body.password = hashedPassword(user.password, 6);

    // Encrypt the email
    body.email = encyptData(body.email);

    const user = new userSchema(body);
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
