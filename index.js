//check
//check2
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const bookRouter = require("./routes/book");

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log("Conneted server");
    } catch (error) {
        console.log(error.message), process.exit(1);
    }
};

connectDB();

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/book", bookRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
