import mysql from 'mysql2';

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
//   host: "us-cdbr-east-05.cleardb.net",
//   user: "b5c3f2ae918802",
//   password: "7e172524",
//   database: "heroku_9961dbe935c2cca"
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