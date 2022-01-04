const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { tryCatch } = require("../middleware/errorHandle");
const Admin = require("../models/Admin");
const { requireLogin } = require("../middleware/auth");
const controller = require("../controller/auth.controller");

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: "Missing username and/or password",
        });

    try {
        // Check for existing user
        const admin = await Admin.findOne({ username });

        if (admin)
            return res
                .status(400)
                .json({ success: false, message: "Username already taken" });

        // All good
        const hashedPassword = await argon2.hash(password);
        const newAdmin = new Admin({
            username,
            password: hashedPassword,
            // title1,
            // tiltle2,
            // id,
            // rating,
            // language,
            // description,
            // uri,
        });
        await newAdmin.save();

        // Return token
        const accessToken = jwt.sign(
            { adminId: newAdmin._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.send({ accessToken, newAdmin });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: "Missing username and/or password",
        });

    try {
        //cseck for existing user
        const admin = await Admin.findOne({ username });
        if (!admin)
            return res
                .status(400)
                .json({ success: false, message: "incorrect u" });

        // username found
        const passwordValid = await argon2.verify(admin.password, password);
        if (!passwordValid)
            return res
                .status(400)
                .json({ success: false, message: "incorrect p" });

        // Return token
        const accessToken = jwt.sign(
            { adminId: admin._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        const id = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const idAdmin = id.adminId;
        res.send({ accessToken, admin, idAdmin });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
router.delete("/logout", async (req, res) => {
    res.send("success");
});
module.exports = router;
