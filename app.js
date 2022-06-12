require("dotenv").config();

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Application = require("./db/applicationDB");
const port = 3000;


//databases

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("connected to db!"))


app.use(express.json());

const applicationRouter = require("./routes/applications")
app.use("/application", applicationRouter) 

//get all
app.get("/",  (req, res) => {
    
});

//create an application
app.post("/", (req, res) => {

    
})

app.listen(port, () => {
    console.log("server listening")
});