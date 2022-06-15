const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    "employer": {
        type: String,
        required: true
    },
    "location" : {
        type: String,
    },
    "response" : {
        type: String,
        default: "off"
    },
    "position" : {
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
    "date": {
        type: Date
    },
    "interview" : {
        type: String,
        default: "off"
    }
    
});

module.exports = mongoose.model("ApplicationDB", applicationSchema);