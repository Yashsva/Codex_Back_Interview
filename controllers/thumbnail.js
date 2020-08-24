//import Dependencies
const jimp = require('jimp');

// generate thumbnail using provided imageUrl
exports.generateThumbnail = (req, res, next) => {

    if (!req.isAuth) {  // user not authenticated

        const err = new Error("User not authenticated");
        err.statusCode = 401;
        return next(err);
    }

    if (!req.body.imageUrl) {   // imageUrl not provided
        
        const err = new Error("imageUrl not present");
        err.statusCode = 422;
        return next(err);
    }


    // get image from provided imageurl
    return jimp.read(req.body.imageUrl)
        .then((image) => {

            image.resize(50, 50);   //resize image for thumbnail
            res.setHeader("Content-Type", image.getMIME());

            return image.getBufferAsync(image.getMIME());   // generate image buffer

        })
        .then((buffer) => {     // thumbnail generated
            return res.send(buffer);    // send image using buffer generated 
        })
        .catch((err) => {
            //Thumbnail generation failed -> generate error 
            const error = new Error("Something Wrong !.Image Processing Failed");
            error.statusCode = 401;
            return next(error); 

        });




}