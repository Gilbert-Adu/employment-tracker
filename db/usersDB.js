const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "country": {
        type: String,
        required: true
    },
    "streetAddress": {
        type: String,
        required: true
    },
    "city": {
        type: String,
        required: true
    },
    "region": {
        type: String,
        required: true
    },
    "postalCode": {
        type: String,
        required: true
    }, 
       
    "username": {
        type: String,
        required: true
    },
    "password" : {
        type: String,
        required: true
    },
    "email" : {
        type: String,
        lowercase: true,
        required: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

            },
            message: '{VALUE} is not a valid email!'
        }
    },
    
});

module.exports = mongoose.model("usersDB", userSchema);