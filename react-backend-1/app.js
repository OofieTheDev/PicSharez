const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const dbConnection = require("./config/db").dbConnection;
const User = dbConnection.models.User;
const MongoStore = require("connect-mongo");
const validate = require("./utils/pwUtils").validate;
const genPass = require("./utils/pwUtils").genPass;
const app = express();
const cors = require("cors");
const port = 3001;

require("dotenv").config();

const sessionStore = MongoStore.create({ mongoUrl: process.env.DB_USER_LINK, collection: 'sessions'});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 *24
    }
}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.urlencoded({ extended : true}));
app.use(express.json());

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

require('dotenv').config();

mongoose.connect("mongodb://localhost:27017/picsharez");
const dataSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    descript: {
        type: String,
        required: true
    },
    likeUsers: {
        type: Array,
        required: true
    },
    dislikeUsers: {
        type: Array,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Moment = mongoose.model("Moment", dataSchema);

function getAllData() {
    return new Promise((resolve, reject) => {
        Moment.find({}, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function postNewData(link, descript, author) {
    await Moment.create({
        link: link,
        descript: descript,
        likeUsers: [],
        dislikeUsers: [],
        author: author
    })
}

function authStatus(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({Error: "You are not authorized."})
    }
}

async function updateData(id, doc) {
    return new Promise((resolve, reject) => {
        Moment.findOneAndReplace({_id: mongoose.Types.ObjectId(id)}, doc, null, (err, docs) => {
            if (err) reject(err);
            resolve("Doc was updated.")
        })
    })
}

async function getUserPosts(user) {
    return new Promise((resolve, reject) => {
        Moment.find({author: user}, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

app.post("/authentication", passport.authenticate("local"), (req, res, next) => {
    console.log(req.body.username, req.body.password);
    console.log("made it");
    res.send("Welcome.");
})

app.post("/register", (req, res) => {
    console.log("Register Triggered");
    genPass(req.body.password).then((hash) => {
        const newUser = new User({
            username: req.body.username,
            hash: hash,
        })
        
        newUser.save();
    }).catch(err => {
        console.log(err);
    })
})

app.get("/data", (req, res) => {
    console.log("Called.");
    getAllData().then(result => {
        console.log(result);
        res.send(result)
    }).catch(err => console.log(err));
})

app.post("/data", (req, res) => {
    console.log("Receiving data.");
    console.log(req.body.id);
    console.log(req.body.data);
    updateData(req.body.id, req.body.data).then(result => {
        console.log(result)
    })
    .catch(err => console.log(`An error occured.\n${err}`));
})

app.post("/posts", (req, res) => {
    const link = req.body.link;
    const descript = req.body.descript;
    postNewData(link, descript, req.body.author);
})

app.get("/users/:userid", (req, res) => {
    const userId = req.params.userid;
    console.log("Reached");
    User.findOne({username: userId}, (err, doc) => {
        // console.log(doc);
        res.send(doc.username);
    })
    
})

app.post("/userposts", (req, res) => {
    console.log("Author: ")
    console.log(req.body.author);
    getUserPosts(req.body.author).then((result) => {
        console.log(result);
        res.send(result);
    }).catch(err => console.log(err));
})

app.get("/test", authStatus, (req, res) => {
    res.send("YOU MADE IT!!!");
})

app.get("/failed", (req, res) => {
    res.send("Login failed.");
})

app.get("/logout", (req, res, next) => {
    req.logout(err => {
        // console.log(err);
        if (!req.isAuthenticated()) {
            console.log("Successfully logged out.");
        } else {
            console.log("User was never logged out.");
        }
    })
})

app.listen(port, () => {
    console.log(`Server has started on Port ${port}`)
});