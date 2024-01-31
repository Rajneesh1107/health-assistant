require("dotenv").config({ silent: true });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ase256 = require("aes256");
const encyptionKey = process.env.ENCRYPTION_KEY;

exports.passwordValidator = (password) => {
  if (password.length < 8) {
    return false;
  }

  // Password should contain at least one capital letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Password should contain at least one number
  if (!/[0-9]/.test(password)) {
    return false;
  }

  // Password should contain at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return false;
  }
  return true;
};

exports.encyptData = (data) => {
  if (typeof data !== "string") {
    throw new Error("Data to be encrypted should be a string");
  }

  console.log({ encyptionKey });
  return ase256.encrypt(encyptionKey, data);
};

exports.decryptData = (data) => {
  if (typeof data !== "string") {
    throw new Error("Data to be decrypted should be a string");
  }
  return ase256.decrypt(encyptionKey, data);
};

//hashed password
exports.hashedPassword = async (plainPassword, saltRound) => {
  try {
    const hashed = await bcrypt.hash(plainPassword, saltRound);
    return hashed;
  } catch (error) {
    return error;
  }
};
//hashed password
exports.comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const hashed = await bcrypt.compare(plainPassword, hashedPassword);
    return hashed;
  } catch (error) {
    return error;
  }
};
