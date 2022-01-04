const authService = require("../service/auth.service");
//
const login = async (req, res) => {
    const response = await authService.login(req.body);
    res.status(response.status).send(response.data);
};

const auth = async (req, res) => {
    const response = await authService.auth(req.userId);
    res.status(response.status).send(response.mess);
};
const authAdmin= async (req, res) => {
    const response = await authService.authAdmin(req.userId);
    res.status(response.status).send(response.mess);
};

module.exports = {
    login,
    auth,
};
