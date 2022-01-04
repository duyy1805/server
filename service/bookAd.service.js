const Book = require("../models/Book");
const getList = async () => {
    const data = await Book.find();
    return data;
};
const getBook = async (idBook) => {
    const data = await Book.find({ _id: idBook });
    return data;
};
const saveBook = async (params) => {
    const { _id, title1, author, rating, language, image, uri, description } =
        params;
    const query = { _id: _id };
    const newValue = {
        title1: title1,
        author: author,
        rating: rating,
        language: language,
        image: image,
        uri: uri,
        description: description,
    };
    const execute = await Book.updateOne(query, newValue, () => {
        console.log("updated");
    });
};
const delBook = async (idBook) => {
    const execute = await Book.deleteOne({ _id: idBook });
};
const addBook = async (params) => {
    const { title1, author, rating, language, image, uri, description } =
        params;
    const newBook = new Book({
        title1,
        author,
        rating,
        language,
        description,
        image,
        uri,
        status: true,
    });
    await newBook.save();
};
module.exports = { getList, getBook, saveBook, delBook, addBook };
