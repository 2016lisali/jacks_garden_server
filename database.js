import mysql from 'mysql2';

// Create a connection to the database
const connection = mysql.createPool({
  host: "localhost",
  user: 'root',
  password: "root",
  database: "jacks_garden"
})

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