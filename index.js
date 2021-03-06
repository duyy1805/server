require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const bookRouter = require("./routes/book");
const authAdminRouter = require("./routes/authAdmin");
const bookAdRouter = require("./routesAd/book");
const accountRouter = require("./routesAd/account");
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
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    exposedHeaders: "Content-Range",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/authAd", authAdminRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/book", bookRouter);
app.use("/api/bookAd", bookAdRouter);

app.use("/api/userAd", accountRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
