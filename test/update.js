// import dependencies
const expect = require('chai').expect;

// import Update Controller
const updateController = require('../controllers/update');

describe("Update_test", function () {

    // test -> when user not authenticated
    it("should throw an error if user not authenticated", function () {

        const req = {
            isAuth: false
        }
        const next = (err) => { throw err; };

        expect(updateController.update.bind(this, req, {}, next)).to.throw("User not authenticated");

    });

    // test -> JSON Doc not provided
    it("should throw an error if JSON Doc not present", function () {

        const req = {
            isAuth: true,
            body: {

                patch: [{ "op": "replace", "path": "/baz", "value": "boo" }]
            }
        }
        const next = (err) => { throw err; };

        expect(updateController.update.bind(this, req, {}, next)).to.throw("JSON Document do not exist");

    });

    // test -> PATCH not provided
    it("should throw an error if PATCH not present", function () {

        const req = {
            isAuth: true,
            body: {
                doc: { "baz": "qux", "foo": "bar" },

            }
        }
        const next = (err) => { throw err; };

        expect(updateController.update.bind(this, req, {}, next)).to.throw("Patch Object do not exist");

    });

    // test -> Either JSON Doc or PATCH is invalid
    it("should throw an error if PATCH or JSON Doc invalid", function () {

        const req = {
            isAuth: true,
            body: {
                doc: { "baz": "qux", "foo": "bar" },
                patch: [{ "op": "lace", "path": "/baz", "value": "boo" }]
            }
        }
        const next = (err) => { throw err; };

        expect(updateController.update.bind(this, req, {}, next)).to.throw("JSON Patching Failed");

    });

    // test -> Recieve UPDATED JSON Doc for valid JSON Doc and PATCH
    it("should recieve updated JSON Doc", function () {

        const req = {
            isAuth: true,
            body: {
                doc: { "baz": "qux", "foo": "bar" },
                patch: [{ "op": "replace", "path": "/baz", "value": "boo" }]
            }
        }


        const res = {
            headers: [],

            setHeader: (key, value) => {

                res.headers.push({ [key]: value });
            },
            send: (updatedJSONDoc) => {

                res.updatedJSONDoc = updatedJSONDoc;

                return res;
            }

        }

        const expectedResult = { "baz": "boo", "foo": "bar" };

        const response = updateController.update(req, res, () => { });


        expect(response.headers).to.length.greaterThan(0);
        expect(response).to.have.property('updatedJSONDoc');
        expect(response.updatedJSONDoc.toString()).to.equal(expectedResult.toString());




    });


})
