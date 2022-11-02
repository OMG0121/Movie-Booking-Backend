const users = require('../models/user.model');
const encoder = require('b2a').btoa;
const uuid = require('uuid');
const tokenGenerator = require('uuid-token-generator');

const signUp = async (req, res) => {
    await users.create({
        userid: (await users.find()).length + 1,
        email: req.body.email,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        username: encoder(req.body.username),
        contact: req.body.contact,
        password: encoder(req.body.password),
        role: req.body.role,
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
    let username = req.body.username;
    let password = req.body.password;

    if (username === undefined && password === undefined) {
        res.status(401).send("Please enter username and password");
        return;
    }

    let userData = await users.find({username: encoder(username)});

    if (userData.length === 0) {
        res.status(401).send("Incorrect Username");
    }
    else {
        if (userData[0].password === encoder(password)) {
            await users.findOneAndUpdate({username: encoder(username)}, {isLoggedIn: true})
            .then(() => {
                res.send("Login successfull");
            })
            .catch((err) => {
                res.status(401);
                console.log(err);
            });
        }
        else {
            res.status(401).send("Incorrect Password");
        }
    }
    
}

const logout = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username === undefined && password === undefined) {
        res.status(401).send("Please enter username and password");
        return;
    }

    let userData = await users.find({username: encoder(username)});

    if (userData.length === 0) {
        res.status(401).send("Incorrect Username");
    }
    else {
        if (userData[0].password === encoder(password)) {
            await users.findOneAndUpdate({username: encoder(username)}, {isLoggedIn: false})
            .then(() => {
                res.send("Logout successfull");
            })
            .catch((err) => {
                res.status(401);
                console.log(err);
            });
        }
        else {
            res.status(401).send("Incorrect Password");
        }
    }
    
}

module.exports = {signUp, login, logout};