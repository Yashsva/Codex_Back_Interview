// import dependencies
const expect = require('chai').expect;

// import thumbnail Controller
const thumbnailController = require('../controllers/thumbnail');


describe("Thumbnail_Test", function () {

    // test -> when user is not authenticated
    it("should throw an error if user not authenticated", function () {

        const req = {
            isAuth: false
        }
        const next = (err) => { throw err; };

        expect(thumbnailController.generateThumbnail.bind(this, req, {}, next)).to.throw("User not authenticated");

    });

    // test -> imageURL not provided
    it("should throw an error if image Url not present", function () {

        const req = {
            isAuth: true,
            body: {}
        }
        const next = (err) => { throw err; };

        expect(thumbnailController.generateThumbnail.bind(this, req, {}, next)).to.throw("imageUrl not present");

    });

    // test -> imageURL provided but INVALID
    it("should throw an error if image Url is invalid", function () {

        const req = {
            isAuth: true,
            body: {
                imageUrl: "www.image.com/ssds",
            }
        }



        try {
            thumbnailController.generateThumbnail(req, {}, () => { });
        }
        catch (err) {

            expect(err).to.have.property("message", "Something Wrong !.Image Processing Failed");
        }



    });

    // test -> Image recieved for correct imageURL
    it("should recieve image if imageUrl is valid", function (done) {

        this.timeout(5000);

        const req = {
            isAuth: true,
            body: {
                imageUrl: "https://img.freepik.com/free-vector/triangular-dark-polygonal-background_23-2148261453.jpg",
            }
        }

        const res = {
            headers: [],
            buffer: {},
            setHeader: (key, value) => {

                res.headers.push({ [key]: value });
            },
            send: (buffer) => {

                res.buffer = Buffer.of(buffer);

                return res;
            }

        }

        thumbnailController.generateThumbnail(req, res, () => { }).then((temp) => {

            expect(temp).to.have.property('buffer');
            expect(temp).to.have.property('headers').with.length.greaterThan(0);
            done();
        });

    });


});