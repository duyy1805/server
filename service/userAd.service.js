const User = require("../models/User");
const getList = async () => {
    const data = await User.find();
    return data;
};
const delUser = async (id) => {
    const execute = await User.deleteOne({ _id: id });
};
module.exports = { getList, delUser };
