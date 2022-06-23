const express = require("express");
const router = express.Router();

const Book = require("../models/Book");

router.get("/show", (req, res, next) => {
    Book.find({})
        .then((books) => {
            books = books.map((book) => book.toObject());
            res.send(books);
        })
        .catch(next);
});

router.post("/show/downloaded", (req, res, next) => {
	const {username} = req.body;
	console.log(username);
    Book.find({ user: username }).then((books) => {
        books = books.map((book) => book.toObject());
        res.send(books);
    });
    // .catch(next);
});
router.get('/download', async (req,res)=>{
	const {title,username} = req.body;
	console.log(req.body);
	var myquery = {title1 : title};
	var newvalues = { status : true  };
	// Book.updateOne(
	// 	{title1: "Buồn"},
	// 	{$push: {user:"title"}}
	// );
	try{
		Book.updateOne(myquery,{$push: {user: username}}, async (err, res) => {
			console.log("updated");
		});
		Book.updateOne(myquery,newvalues, async (err, res) => {
			console.log("updated");
		});
		}	catch(error){}
});

router.post("/autocomplete", async (req, res) => {
    const { title } = req.body;

    Book.find({ title1: { $regex: title, $options: "i" } }).then((books) => {
        res.send(books);
    });
});

router.post('/NewBook', async (req, res) => {
	const {title1,author,rating,language,description,image,uri,status,user } = req.body
	try {
		// Check for existing user
		const book = await Book.findOne({ title1 })

		if (book)
			return res
				.status(400)
				.json({ success: false, message: 'Book already taken' })
		// All good
		const newBook = new Book({title1,author,rating,language,description,image,uri,status,user })
		await newBook.save()
		res.json({ success: true, message: 'Add a new book!', book: newBook })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router;
