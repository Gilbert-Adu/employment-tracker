require("dotenv").config();
const path = require("path");
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");



//databases

mongoose.connect(process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true },
    (err) => {
        if (err) console.log(err)
        else console.log("mongodb is connected!");
    }
    );
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("connected to db!"))



app.use(bodyParser.urlencoded({ extended: true }));



//routes

//signup route
const signUpRouter = require("./routes/users");
app.use("/user", signUpRouter);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
//serving customer-side code
app.get("/", (req, res) => {
    
    res.sendFile(path.join(__dirname, "/frontend/firstpage.html"));

});



app.listen(process.env.PORT, () => {
    console.log("server listening")
});