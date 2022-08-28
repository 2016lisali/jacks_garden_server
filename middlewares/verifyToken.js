import jwt from "jsonwebtoken";

// check if there is an token in the request header, if yes, verify if it is valid and the user info.
//If the token is valid, set the req.user = user (from verify jwt), otherwise,
//set the req.user={userId: 0, isAdmin: 0};
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                req.user = { userId: 0, isAdmin: 0 };
            }
            req.user = user;
        });
    } else {
        req.user = { userId: 0, isAdmin: 0 };
    }
    next();
};
// check if the user is the cart owner
export const verifyTokenAndAuthentication = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                req.user = { userId: 0, isAdmin: 0 };
                res.status(403).json("Token is invalid");
            } else if (user.userId === 144 || user.userId === 39) {
                if (req.method === "GET") {
                    req.user = user;
                    next();
                } else {
                    res.status(403).json("You are not authenticated.");
                }
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        req.user = { userId: 0, isAdmin: 0 };
        res.status(403).json("You are not authenticated.");
    }
};

// const ip_white_list = ['127.0.0.1', '10.1.90.162', '10.1.16.81']
// check if the user is admin and if the ip address is in the ip white list
export const verifyTokenAndAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                req.user = { userId: 0, isAdmin: 0 };
                res.status(403).json("Token is invalid");
            } else if (
                user.isAdmin === 1 &&
                user.userId !== 144 &&
                user.userId !== 39
            ) {
                req.user = user;
                next();
            } else if (
                user.isAdmin === 1 &&
                (user.userId === 144 || user.userId === 39)
            ) {
                req.method === "GET"
                    ? next()
                    : res
                        .status(403)
                        .json("Only get requests allowed for test account");
            } else {
                res.status(403).json("You are not authenticated.");
            }
        });
    } else {
        res.status(403).json("You are not authenticated.");
    }
};
