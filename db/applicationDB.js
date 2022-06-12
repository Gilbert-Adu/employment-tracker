const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    "employer": {
        type: String,

    }, 
    
});

module.exports = mongoose.model("ApplicationDB", applicationSchema);