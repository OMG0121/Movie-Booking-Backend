const users = require('../models/user.model');
const encoder = require('b2a').btoa;
const decoder = require('b2a').atob;
const uuid = require('uuid');
const tokenGenerator = require('uuid-token-generator');
const { head } = require('../routes/movie.routes');

const signUp = async (req, res) => {
    await users.create({
        userid: (await users.find()).length + 1,
        email: req.body.email_address,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.first_name+req.body.last_name,
        contact: req.body.mobile_number,
        password: req.body.password,
        role: "user",
        isLoggedIn: false,
        uuid: uuid.v4(),
        accesstoken: new tokenGenerator().generate(),
        coupens: [],
        bookingRequests: []
    }).then(() => {res.send("New User Created");})
    .catch((err) => {
        res.send("New User Not Created");
})
}

const login = async (req, res) => {
    const decodedHeader = decoder(req.headers.authorization.split(" ")[1]).split(":");
    let username = decodedHeader[0];
    let password = decodedHeader[1];

    if (username === undefined && password === undefined) {
        res.send("Incorrect");
        return;
    }

    let userData = await users.find({username: username});

    if (userData.length === 0) {
        res.send("Incorrect");
    }
    else {
        if (userData[0].password === password) {
            await users.findOneAndUpdate({username: username}, {isLoggedIn: true})
            .then(() => {
                res.send(userData[0]);
            })
            .catch((err) => {
                res.send("Incorrect");
                console.log(err);
            });
        }
        else {
            res.send("Incorrect");
        }
    }
    
}

const logout = async (req, res) => {
    let uuid = req.body.uuid;
    let userData = await users.find({uuid: uuid});
    if (userData.length === 0) {
        res.send({"message":"Logg Out unsuccessfull."});
    }
    else {
        await users.findOneAndUpdate({uuid: uuid}, {isLoggedIn: false})
        .then(() => {
            res.send({"message": "Logged Out successfully."});
        })
        .catch((err) => {
            res.status(401);
            console.log(err);
        });
    }
}

const getCouponCode = async (req, res) => {
    let code = parseInt(req.query.code);
    let header = req.headers.authorization.split(" ");
    let accesstoken = "";
    if (header[1] !== undefined) {
        accesstoken = header[1];
    }

    const userData = await users.find({accesstoken: accesstoken});
    let coupens = userData[0].coupens;

    for(let i=0; i<coupens.length; i++) {
        if (coupens[i].id === code) {
            res.send(coupens[i]);
        }
    }
    
}

const bookShow = async (req, res) => {
    let uuid = req.body.customerUuid;

    let usersData = await users.find({uuid: uuid});

    let referenceNumber = Date.now();

    let bookingRequest = {reference_number: referenceNumber, ...req.body.bookingRequest};

    await users.findOneAndUpdate({uuid: uuid}, {$push : {bookingRequests: bookingRequest}})
    .then(() => {
        res.send(bookingRequest);
    })
    .catch((err) => {
        console.log(err);
    })

}

module.exports = {signUp, login, logout, getCouponCode, bookShow};