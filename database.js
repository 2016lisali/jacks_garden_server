import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

// Create a connection to the database
// CONNECT TO LOCAL DB
const connection = mysql.createPool({
  host: "localhost",
  user: 'root',
  password: "root",
  database: "jacks_garden"
})

// CONNECT TO clearDB
// const connection = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.DBUSER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE
// })

// This wrapper will allow the use of promise functions so that we can use it in any async way along with expressJs
const query = (sql, parameters) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, parameters, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

export default query;