import cors from 'cors';
const allowedOrigins_store = ["https://jacksgarden.netlify.app", "https://jacksgardenadmin.netlify.app"]
const allowedOrigins_admin = ["https://jacksgardenadmin.netlify.app", "192.168.1.108", "http://localhost:3002"]

const corsOptionsDelegate_admin = (req, callback) => {
  // allowedOrigins_admin.indexOf(myIpAddress) !== -1 || 
  const myIpAddress = req.socket?.remoteAddress; // This is where you get the IP address from the request
  console.log(myIpAddress);
  if (allowedOrigins_admin.indexOf(req.header("origin")) !== -1 && allowedOrigins_admin.indexOf(myIpAddress)) {
    return callback(null, true)
  } else {
    let msg = 'The CORS policy for this site does not allow access from you origin/ip'
    return callback(new Error(msg), false)
  }
}

// const corsOptionsDelegate_store = (origin, callback) => {
//   if (allowedOrigins_store.indexOf(origin) !== -1) {
//     return callback(null, true)
//   } else {
//     let msg = 'The CORS policy for this site does not allow access from you origin/ip'
//     return callback(new Error(msg), false)
//   }
// }

export const cors_admin = cors(corsOptionsDelegate_admin)

export const cors_store = cors({
  origin: allowedOrigins_store,
  optionsSuccessStatus: 200
})