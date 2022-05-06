import query from '../database.js';

// create user
const createUser = (firstName, lastName, email, password, dateCreate) => {
  return query("INSERT INTO users (firstName, lastName, email, password, dateCreate) " +
    "VALUES (?, ?, ?, ?, ?)", [firstName, lastName, email, password, dateCreate])
}

// add email to mail list
const addEmailToMailList = (email) => {
  return query("INSERT INTO mailing_list (email) " +
    "VALUES (?)", [email])
}
// get all user's info except password
const getAllUsers = () => {
  return query("SELECT userId, firstName, lastName, email, isAdmin, dateCreate " +
    "FROM users")
}
// get  user by userId
const getUserById = (userId) => {
  return query("SELECT userId, firstName, lastName, email, isAdmin, dateCreate " +
    "FROM users " +
    "WHERE userId=?", [userId])
}
// get user by name
const getUserBySearch = (email, firstName, lastName) => {
  return query("SELECT userId, firstName, lastName, email, password, isAdmin, dateCreate " +
    "FROM users " +
    "WHERE email=? OR (firstName=? or lastName=?)", [email, firstName, lastName])
}
//update user 
const updateUser = (userId, firstName, lastName, email, password) => {
  return query("UPDATE users " +
    "SET firstName=?, lastName=?, email=?, password=? " +
    "WHERE userId=?", [firstName, lastName, email, password, userId])
}
//delete user
const deleteUser = (userId) => {
  return query("DELETE FROM users " +
    " WHERE userId=? ", [userId])
}

// create admin user
const createAdmin = (firstName, lastName, email, password, isAdmin, dateCreate) => {
  return query("INSERT INTO users (firstName, lastName, email, password, isAdmin, dateCreate) " +
    "VALUES (?, ?, ?, ?, ?, ?)", [firstName, lastName, email, password, isAdmin, dateCreate])
}
export default { createUser, getAllUsers, getUserById, getUserBySearch, updateUser, deleteUser, createAdmin, addEmailToMailList };