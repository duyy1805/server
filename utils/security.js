require("dotenv").config();
const jwt = require("jsonwebtoken");

//ma hoa 2 chieu

const generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
    });
    return token;
};

const verifyToken = (accessToken) => {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return data.userId;
};

module.exports = {
    generateToken,
    verifyToken,
};
