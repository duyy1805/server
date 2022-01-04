const express = require("express");
const router = express.Router();

const Book = require("../models/Reading");

router.get("/book/reading", (req, res, next) => {
    const { title } = req.body;
    Reading.findOne({ title: title })
        .then((reading) => {
            const pageReading = reading.page;
            res.send(pageReading);
        })
        .catch(next);
});
router.post('./book/reading',(req,res,next)=>{ 
    const {title,page}=req.body;
    var myquery = {title : title};
	var newvalues = { page : page  };
		Book.updateOne(myquery,newvalues, async (err, res) => {
			console.log("updated");
		});
		.catch(next)
}

})
