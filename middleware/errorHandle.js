const tryCatch = (func) => async (req, res, next) => {
    try {
        await func(req, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// aysnc function tryCatch(req, res, next) {
//     try {
//         await func(req, res);
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }

module.exports = { tryCatch };
