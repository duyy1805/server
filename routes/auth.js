const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { tryCatch } = require("../middleware/errorHandle");
const User = require("../models/User");
const { requireLogin } = require("../middleware/auth");
const controller = require("../controller/auth.controller");
// router.post("/", requireLogin, tryCatch(controller.auth));
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
        const user = await User.findOne({ username });

        if (user)
            return res
                .status(400)
                .json({ success: false, message: "Username already taken" });

        // All good
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
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
        await newUser.save();

        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.send({ accessToken, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: "Missing username and/or password",
        });

    try {
        //cseck for existing user
        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "incorrect u" });
        } else {
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid)
                return res
                    .status(400)
                    .json({ success: false, message: "incorrect p" });
            else {
                const accessToken = jwt.sign(
                    { userId: user._id },
                    process.env.ACCESS_TOKEN_SECRET
                );
                const id = jwt.verify(
                    accessToken,
                    process.env.ACCESS_TOKEN_SECRET
                );
                const idUser = id.userId;
                res.send({ accessToken, user });
            }
        }
        // username found
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
