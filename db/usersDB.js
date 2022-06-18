const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
       
    "person":{
        "accessToken": {
            type: String,
            default: ""
        },
        "username": {
            type: String,
            required: true
        },
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
        "region":{
            type: String,
            required: true
        },
        "postalCode": {
            type: String,
            required: true
        },
        "email": {
            type: String,
            lowercase: true,
            required: true,
            validate: {
                validator: function(v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

                },
                message: '${VALUE} is not a valid email!'
            }
        },
        "password": {
            type: String,
            required: true
        },
        "posts": {

            type: Array,
            default: [
                {
                    "employer": {
                        type: String,
                        default: ""
                    },
                    "location": {
                        type: String,
                        default: ""
                    },
                    "response": {
                        type: String,
                        default: "off"
                    },
                    "position": {
                        type: String,
                        default: ""
                    },
                    "email": {
                        type: String,
                        lowercase: true,
                        required: true,
                        validate: {
                            validator: function(v) {
                                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            
                            },
                            message: '${VALUE} is not a valid email!'
                        }

                    },
                    "date": {
                        type: Date,
                        default: Date.now()
                    },
                    "interview": {
                        type: String,
                        default: "off"
                    }
        
                }
            ],
            
        }
    }
    
});

module.exports = mongoose.model("usersDB", userSchema);