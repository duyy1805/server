// const db = require("../utils/db");
const security = require("../utils/security");
const User = require("../models/User");
const Admin = require("../models/Admin");

const auth = async (userId) => {
    // console.log(role);
    const isUser = User.findOne({ _id: userId });
    if (!isUser) {
        return {
            status: 401,
            mess: "Unauthorized",
        };
    }
    return {
        status: 200,
        mess: {
            ...isUser,
        },
    };
};
const authAdmin = async (userId) => {
    // console.log(role);
    const isAdmin = Admin.findOne({ _id: AdminId });
    if (!isAdmin) {
        return {
            status: 401,
            mess: "Unauthorized",
        };
    }
    return {
        status: 200,
        mess: {
            ...isAdmin,
        },
    };
};

module.exports = {
    auth,
    authAdmin,
};
