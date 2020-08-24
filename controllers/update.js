//import Dependencies
const jsonPatch = require('jsonpatch');
const { json } = require('body-parser');

// Update JSON Doc using  PATCH 
exports.update = (req, res, next) => {

    if (!req.isAuth) {      // user not authenticated

        const err = new Error("User not authenticated");
        err.statusCode = 401;
        return next(err);
    }

    // retrieve JSON DOCUMENT and PATCH from request 
    const JSONDoc = req.body.doc;
    const patch = req.body.patch;


    if (!JSONDoc) {     //JSON Doc not provided in request
        const err = new Error('JSON Document do not exist');
        err.statusCode = 422;
        return next(err);
    }
    if (!patch) {       //PATCH not provided in request
        const err = new Error('Patch Object do not exist');
        err.statusCode = 422;
        return next(err);
    }

    let patchDoc;

    try {
        // generate updated JSON Doc after applying PATCH
        patchDoc = jsonPatch.apply_patch(JSONDoc, patch);
    } catch (err) {
        // JSON Doc. updation failed -> generate error
        const error = new Error('JSON Patching Failed');
        error.statusCode = 422;
        return next(error);
    }

    res.setHeader("Content-Type", "application/json");  
    return res.send(patchDoc);      // send updated JSON Doc



}