const bookAdService = require("../service/bookAd.service");
getList = async (req, res) => {
    const data = await bookAdService.getList();
    res.send(data);
};
getBook = async (req, res) => {
    const { idBook } = req.params;
    const data = await bookAdService.getBook(idBook);
    res.send(data);
};
saveBook = async (req, res) => {
    const execute = await bookAdService.saveBook(req.body);
    res.send(execute)
};
delBook = async (req, res) => {
    const { _id } = req.body;
    const execute = await bookAdService.delBook(_id);
     res.send(execute)
};
addBook = async (req, res) => {
    const execute = await bookAdService.addBook(req.body);
    res.send(execute)
};

module.exports = { getList, getBook, saveBook, delBook, addBook };
