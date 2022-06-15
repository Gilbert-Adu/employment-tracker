require("dotenv").config();
const path = require("path");
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Application = require("./db/applicationDB");
const bodyParser = require("body-parser");
const port = 3000;


//databases

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("connected to db!"))



app.use(bodyParser.urlencoded({ extended: true }));



//routes
const applicationRouter = require("./routes/applications")
app.use("/application", applicationRouter) 

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
//serving customer-side code
app.get("/", (req, res) => {
    
    res.sendFile(path.join(__dirname, "/frontend/index.html"));

});



app.listen(port, () => {
    console.log("server listening")
});