//import Dependencies
const express = require('express');
const bodyParser = require('body-parser');

// create express application
const app = express();

// include auth function from auth.js file
const isAuth = require('./middlewares/auth').auth;

//include controllers for login,update and thumbnail
const thumbnailController = require('./controllers/thumbnail');
const loginController = require('./controllers/login');
const updateController = require('./controllers/update');

//parse body(JSON format) from request
app.use(bodyParser.json());

//check request for authentication  
app.use(isAuth);

// route - login
app.post('/login', loginController.login);

// route - generating thumbnail
app.post('/getThumbnail', thumbnailController.generateThumbnail);

// route - updating JSON Doc using JSON Patch
app.patch('/update', updateController.update);

// Handle invalid request
app.use('/', (req, res, next) => {
    return res.json('Invalid Request !');
});

// Error Handler
app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message;
    res.status(statusCode).json({ message: message });
});


//listen on port 3500
app.listen(3500, () => {
    console.log("Listening on 3500");
});
