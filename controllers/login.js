//import Dependencies
const jwt = require('jsonwebtoken');

//dummy password and username for login
const dummyPass = "12345pass";
const dummyUsername = "12345";

//user login
exports.login = (req, res, next) => {

    if (req.body.password.toString() !== dummyPass || req.body.username.toString() !== dummyUsername) {
        
        //password or username invalid
        const err = new Error("Invalid Username or Password");
        err.statusCode = 401;
        return next(err);   // generate error (handled by express error handler defined in app.js)
    }

    // generate JWT token
    const token = jwt.sign(
        {
            username: req.body.username
        },
        "Y@lg@@r-$ecret-$ecret-$ecret",
        {
            expiresIn: "2h"     // token expires in 2 hours
        });

    // return JWT token
    return res.status(200).json({ token: token });


}