// import dependencies
const expect = require('chai').expect;

// import login Controller
const loginController = require('../controllers/login');

describe('Login_test', function () {

    // test -> wrong password
    it('should throw an error if password is wrong', function () {
        const req = {
            body: {
                password: "123",
                username: "12345"
            }
        };

        expect(loginController.login.bind(this, req, {}, (err) => { throw err; })).to.throw('Invalid Username or Password');


    });

    // test -> wrong username
    it('should throw an error if username is wrong', function () {
        const req = {
            body: {
                password: "12345pass",
                username: "123"
            }
        };

        expect(loginController.login.bind(this, req, {}, (err) => { throw err; })).to.throw('Invalid Username or Password');


    });

    // test -> wrong username and password
    it('should throw an error if  both username and password is wrong', function () {
        const req = {
            body: {
                password: "123a34",
                username: "123"
            }
        };

        expect(loginController.login.bind(this, req, {}, (err) => { throw err; })).to.throw('Invalid Username or Password');


    });


    // test -> Generation of JWT token for Correct username and password  
    it('should return a jwt token', function () {
        const req = {
            body: {
                password: "12345pass",
                username: "12345"
            }
        };
        const res = {

            status: (statCode) => {
                res.statusCode = statCode;
                return res;
            },

            json: (object) => {
                res.JSON = (object);
                return res;
            }
        }



        expect(loginController.login(req, res, () => { })).to.have.nested.property("JSON.token");



    });


});

