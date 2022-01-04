const userAdService = require("../service/userAd.service");
getList = async (req, res) => {
    const data = await userAdService.getList();
    res.send(data);
};
delUser = async (req, res) => {
    const { id } = req.body;
    const execute = await userAdService.delUser(id);
};
module.exports = { getList, delUser };
