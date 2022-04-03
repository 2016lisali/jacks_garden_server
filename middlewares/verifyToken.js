import jwt from "jsonwebtoken";

// check if there is an token in the reqest header, if yes, verify if it is valid and the user info. If the token is valid, 
// set the req.user = user (from verify jwt), otherwise, set the req.user={userId: 0, isAdmin: 0};
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        req.user = { userId: 0, isAdmin: 0 };
      }
      req.user = user;
    })
  } else {
    req.user = { userId: 0, isAdmin: 0 };
  }
  next();
}
// check if the user is the cart owner
export const verifyTokenAndAuthentication = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.userId === req.params.userId || req.user?.isAdmin) {
      next()
    } else {
      res.status(403).json("You are not authenticated.")
    }
  })
}
// check if the user is admin
export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next()
    } else {
      res.status(403).json("You are not authenticated.")
    }
  })
}