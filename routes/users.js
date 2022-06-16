const express = require("express");
const router = express.Router();
const User = require("../db/usersDB");
const bcrypt = require("bcrypt");


const path = require("path");

//signup route

router.get("/signup", (req, res) => {


    res.status(201).sendFile(path.join(__dirname, "/signup.html"));



    

});

router.post("/signup", async (req, res) => {
    

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = User ({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            country: req.body.country,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            region: req.body.region,
            postalCode: req.body.postalCode
        });
        await user.save();
        console.log(user);
        res.status(201).send(user)

    } catch (err) {

        console.log({message: err.message })

    }
});

router.get("/login", (req, res) => {

    res.status(201).sendFile(path.join(__dirname, "/firstpage.html"));

});

router.post("/login", async (req, res) => {

    let entry;

    const cursor = User.find().cursor();

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {

        if (doc.username == req.body.username) {

            entry = doc;
        }
    }

    if (entry == null) {
        return res.status(400).send("could not find user")
    }

    try {
        if (await bcrypt.compare(req.body.password, entry.password)) {
            res.status(201).sendFile(path.join(__dirname, "/index.html"));


        }else {
            
            res.status(400).sendFile(path.join(__dirname, "/LoginError.html"))
        }

    } catch(err) {
        res.send({message: err.message})

    }
});

module.exports = router;

