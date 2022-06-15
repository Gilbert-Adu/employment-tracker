const express = require("express");
const router = express.Router();
const Application = require("../db/applicationDB");
const path = require("path");

//gett all
router.get("/", async (req, res) => {
    try {
        applications = await Application.find();
        res.json(applications);
    }catch(err) {
        res.status(500).json({ message: err.message })

    } 
})

//create an application entry
router.post("/", async (req, res) => {
    const entry = new Application({
        employer: req.body.employerName,
        location: req.body.location,
        response: req.body.response,
        position: req.body.position,
        email: req.body.email,
        date: Date.now(),
        interview: req.body.interview
    })

    try {
        const newEntry = await entry.save()
        console.log(newEntry);
        res.status(201).sendFile(path.join(__dirname, "/FormSubmissionSuccess.html"));


    } catch (err) {

        res.status(400).sendFile(path.join(__dirname, "FormSubmissionError.html"))

    }

});
module.exports = router;