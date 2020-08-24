const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {

    //get JWT token 
    const token = req.get('Authorization');

    
    if (!token) {      // user not authenticated
        req.isAuth = false;
        return next();

    }

    let decodedToken;

    try {   // verify JWT Token
        
        decodedToken = jwt.verify(token, 'Y@lg@@r-$ecret-$ecret-$ecret');

    } catch (err) {     
        //unable to verify JWT Token  
        req.isAuth = false;
        return next();
    }

    // Token Verified -> User is authenticated
    req.isAuth = true;
    next();
}