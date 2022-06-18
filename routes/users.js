require("dotenv").config();

//express
const express = require("express");
const router = express.Router();

//database
const User = require("../db/usersDB");
//dependencies
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");

//login
router.post("/login", async (req,res) => {

    //find a user in the db that has the same username as the username from the request

    let entry;

    const cursor = User.find().cursor();

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        if (doc.person.username == req.body.username) {
            entry = doc;
        }
    }

    if (entry == null) {
        return res.send("could not find user")
    }

    try {
        if (await bcrypt.compare(req.body.password, entry.person.password)) {
            const accessToken = generateAccessToken({username: entry.person.username});
            //save this user's access token in the DB.
            await User.updateOne({"person.username": req.body.username}, {$set: {"person.accessToken":accessToken}})
            //res.send({accessToken: accessToken})
            res.sendFile(path.join(__dirname, "/index.html"))
            
        }else {
            res.sendFile(path.join(__dirname, "/LoginError.html"))
        }
    } catch(err) {
        res.send({"message": err.message})

    }

});


router.get("/submitposts", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});
let userToken;
//make a post
router.post("/submitposts", async (req, res) => {


    //verify the token
    //--------------------------------------------
    
    const post = {
        "employer": req.body.employerName,
        "location": req.body.location,
        "response": req.body.response,
        "position": req.body.position,
        "email": req.body.email,
        "interview": req.body.interview
    }
    const doc = await User.find({"person.accessToken": userToken});
    const { person } = doc[0];
    entry = person;
    const docPosts = entry.posts;
    docPosts.push(post);
    await User.updateOne({"person.accessToken": userToken}, {$set: {"person.posts": docPosts}});
    res.sendFile(path.join(__dirname, "/FormSubmissionSuccess.html"));
    
    
    //----------------------------------------------------
    //console.log(doc)
    
    /**
     * let entry;
    const doc = await User.find({"person.username": req.user.username});
    const { person } = doc[0]
    entry = person;
    const docPosts = entry.posts;
    docPosts.push(post);
    await User.updateOne({"person.username": req.user.username}, {$set: {"person.posts":docPosts}})
    const  updatedUser = await User.find({"person.username": req.user.username});
    console.log(updatedUser);
    res.sendFile(path.join(__dirname, "/FormSubmissionSuccess.html"));
    //res.send(updatedUser)

     */

    
    
});

//get a user's posts
router.get("/getposts", async (req,res) => {
    //console.log(req.body)
    let entry;
    const doc = await User.find({"person.accessToken": userToken});
    const { person } = doc[0]
    entry = person;

    //add an HTML page here to display user's posts
    res.json(entry.posts);    

})

//get signup form for new user
router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "/signup.html"));

})
//signup
router.post("/signup", async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword)

    try {
        const Person = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            country: req.body.country,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            region: req.body.region,
            postalCode: req.body.postalCode,
            posts: []
        }
        const newUser = User({
            person: Person
        });
        await newUser.save();
        res.sendFile(path.join(__dirname, "/firstpage.html"));

    } catch (err) {
        console.log({"Error": err.message})
    }
    
});

function generateAccessToken(user) {

    return userToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "5m"});


}

//authenticate token

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(404)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next();

        
    })
    
}





module.exports = router;