import validator from 'validator';
import userModel from '../models/userModel.js';
import { createCart, deleteCart, emptyCart } from '../models/cartModel.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// create user account/ register
export const createUser = async (req, res) => {
  const user = req.body;
  let data;
  try {
    // check if email already registered
    const existingUser = await userModel.getUserBySearch(user.email);
    if (existingUser.length > 0) return res.status(400).json("User already exist.")
    if (user.password != user.confirmPassword) return res.status(400).json("Password must match")
    // hash the password before insert it into database
    const hashedPassword = bcrypt.hashSync(user.password, 12);
    const now = new Date();
    data = await userModel.createUser(
      validator.escape(user.firstName),
      validator.escape(user.lastName),
      validator.escape(user.email),
      hashedPassword,
      validator.escape(user.isAdmin),
      now
    )
    const cart = await createCart(data.insertId)
    res.status(201).json(`user created with id ${data.insertId}, cart ${cart.insertId}`)
  } catch (error) {
    console.log(error);
    return res.status(500).json("userController error. query error - failed to create user")
  }
}
// create Admin account
export const createAdmin = async (req, res) => {
  const admin = req.body;
  try {
    // check if email already registered
    const existingAdmin = await userModel.getUserByEmail(admin.email);
    if (existingAdmin > 0) return res.status(400).json("Email address already exists.")
    // check if confirm password is match
    !validator.isEmail(admin.email) && res.status(300).json("invalid email");
    // hash the password before insert it into database
    const hashedPassword = bcrypt.hashSync(admin.password, 12);
    const now = new Date();
    const data = await userModel.createAdmin(
      validator.escape(admin.firstName),
      validator.escape(admin.lastName),
      validator.escape(admin.email),
      hashedPassword,
      1,
      now
    )
    res.status(201).json("Admin created with id " + data.insertId)
  } catch (error) {
    console.log(error);
    res.status(500).json("userController error. query error - failed to create user")
  }
}
// get all users
export const getAllUsers = async (req, res) => {
  try {
    const data = await userModel.getAllUsers()
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json("get all users query error")
  }
}

// get user by userId
export const getUserById = async (req, res) => {
  console.log("get User by id");
  console.log(req.params.id);
  try {
    const data = await userModel.getUserById(req.params.id);
    console.log(data);
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    res.status(500).json("getUserById query error")
  }
}
//
export const getUserBySearch = async (req, res) => {
  // not sure here should use req.body or req.params.email
  const { name, email } = req.query;
  const firstName = name?.split(" ")[0];
  const lastName = name?.split(" ")[1];
  console.log(email, firstName, lastName);
  try {
    const data = await userModel.getUserBySearch(
      email && validator.escape(email),
      firstName && validator.escape(firstName),
      lastName && validator.escape(lastName)
    );
    data.length > 0 ?
      res.status(200).json(data) :
      res.status(404).json("Can not find the user matching your search")
  } catch (error) {
    console.log(error);
    res.status(500).json("getUserBySearch query error")
  }
}

// update user
export const updateUser = async (req, res) => {
  const user = req.body;
  let hashedPassword = user.password;
  !user.password.startsWith("$2b$") && (hashedPassword = bcrypt.hashSync(user.password, 12))
  try {
    const data = await userModel.updateUser(
      user.userId,
      validator.escape(user.firstName),
      validator.escape(user.lastName),
      validator.escape(user.email),
      hashedPassword,
      user.isAdmin
    )
    console.log(data);
    data.affectedRows > 0 ?
      res.status(200).json("User updated") :
      res.status(404).json("User not found")
  } catch (error) {
    console.log(error);
    res.status(500).json("failed to update user")
  }
}
//delete user
export const deleteUser = async (req, res) => {
  try {
    let userId = req.params.id
    const data = await userModel.deleteUser(userId)
    await deleteCart(userId)
    await emptyCart(userId)
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    return res.status(500).json("Can not delete user, query error")
  }
}

// login user
export const login = async (req, res) => {
  console.log("login");
  const { email, password } = req.body
  try {
    const user = await userModel.getUserBySearch(email);
    if (user.length === 0) return res.status(404).json("User does not exist.")
    const isPasswordCorrect = bcrypt.compareSync(password, user[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Password is not match with the account.")
    // if the email and password both correct, create a jwt token for the user, and send it to the user
    const token = jwt.sign(
      {
        id: user[0].userId,
        isAdmin: user[0].isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).json({ ...user[0], token, password: "" })
  } catch (error) {
    console.log(error);
    res.status(500).json("Login query error")
  }
}

export const addEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const isExisted = await userModel.getUserBySearch(email);
    if (isExisted.length > 0) return res.status(400).json("Email already exist.")
    await userModel.addEmailToMailList(email)
    res.status(201).json("Email has been added to the mailing list.")
  } catch (error) {
    console.log(error);
    res.status(500).json("query error")
  }
}