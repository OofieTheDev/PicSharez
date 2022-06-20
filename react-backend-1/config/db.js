const mongoose = require("mongoose");

require("dotenv").config()

const dbConnection = mongoose.createConnection(process.env.DB_USER_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String, 
        required: true
    }
});

const User = dbConnection.model("User", userSchema);

module.exports.dbConnection = dbConnection;