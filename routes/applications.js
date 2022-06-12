const express = require("express");
const router = express.Router();
const Application = require("../db/applicationDB");

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
        employer: req.body.employer
    })

    try {
        const newEntry = await entry.save()
        res.status(201).json(newEntry)

    } catch (err) {

        res.status(400).json({ message: err.message })

    }

});
module.exports = router;