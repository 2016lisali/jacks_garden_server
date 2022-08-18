import query from "../database.js";

// create user
const createUser = (
    firstName,
    lastName,
    email,
    password,
    isAdmin,
    dateCreate
) => {
    return query(
        "INSERT INTO users (firstName, lastName, email, password, isAdmin, dateCreate) " +
            "VALUES (?, ?, ?, ?, ?, ?)",
        [firstName, lastName, email, password, isAdmin, dateCreate]
    );
};

// add email to mail list
const addEmailToMailList = (email) => {
    return query("INSERT INTO mailing_list (email) " + "VALUES (?)", [email]);
};
// get all mail list
const getEmailList = () => {
    return query(`SELECT * FROM mailing_list 
  ORDER BY email_id`);
};
// get all user's info except password
const getAllUsers = () => {
    return query(
        "SELECT userId, firstName, lastName, email, isAdmin, dateCreate " +
            "FROM users ORDER BY dateCreate DESC"
    );
};
// get  user by userId
const getUserById = (userId) => {
    return query(
        "SELECT userId, firstName, lastName, email, isAdmin, dateCreate " +
            "FROM users " +
            "WHERE userId=?",
        [userId]
    );
};
// get user by name
const getUserBySearch = (email, firstName, lastName) => {
    return query(
        "SELECT userId, firstName, lastName, email, password, isAdmin, dateCreate " +
            "FROM users " +
            "WHERE email=? OR (firstName=? or lastName=?)",
        [email, firstName, lastName]
    );
};
//update user
const updateUser = (userId, firstName, lastName, email, password, isAdmin) => {
    return query(
        "UPDATE users " +
            "SET firstName=?, lastName=?, email=?, password=?, isAdmin=? " +
            "WHERE userId=?",
        [firstName, lastName, email, password, isAdmin, userId]
    );
};
//delete user
const deleteUser = (userId) => {
    return query("DELETE FROM users " + " WHERE userId=? ", [userId]);
};

// create admin user
const createAdmin = (
    firstName,
    lastName,
    email,
    password,
    isAdmin,
    dateCreate
) => {
    return query(
        "INSERT INTO users (firstName, lastName, email, password, isAdmin, dateCreate) " +
            "VALUES (?, ?, ?, ?, ?, ?)",
        [firstName, lastName, email, password, isAdmin, dateCreate]
    );
};
export default {
    createUser,
    getAllUsers,
    getUserById,
    getUserBySearch,
    updateUser,
    deleteUser,
    createAdmin,
    addEmailToMailList,
    getEmailList,
};
