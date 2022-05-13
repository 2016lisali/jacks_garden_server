import cors from 'cors';
const allowedOrigins_store = ["https://jacksgarden.netlify.app", "https://jacksgardenadmin.netlify.app"]
const allowedOrigins_admin = ["https://jacksgardenadmin.netlify.app", "http://192.168.1.108"]

export const corsOptionsDelegate_admin = (req, origin, callback) => {
  // allowedOrigins_admin.indexOf(myIpAddress) !== -1 || 
  const myIpAddress = req.socket.remoteAddress; // This is where you get the IP address from the request
  console.log(myIpAddress);
  if (allowedOrigins_admin.indexOf(origin) !== -1) {
    return callback(null, true)
  } else {
    let msg = 'The CORS policy for this site does not allow access from you origin/ip'
    return callback(new Error(msg), false)
  }
}

export const corsOptionsDelegate_store = (origin, callback) => {
  if (allowedOrigins_store.indexOf(origin) !== -1) {
    return callback(null, true)
  } else {
    let msg = 'The CORS policy for this site does not allow access from you origin/ip'
    return callback(new Error(msg), false)
  }
}

export const cors_admin = cors({ origin: corsOptionsDelegate_admin })

export const cors_store = cors({ origin: corsOptionsDelegate_store })