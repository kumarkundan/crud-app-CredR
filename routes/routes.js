var express = require('express');

function setup(app, handlers) {

    var userRouter = express.Router();
    userRouter.post("/saveUser", handlers.userController.saveUser);
    userRouter.get("/getUsers", handlers.userController.getUsers);
    userRouter.post("/updateUser", handlers.userController.updateUser);
    userRouter.get("/removeUser/:userId", handlers.userController.removeUser);
    app.use('/basicNode/services', userRouter);


    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        //   res.locals.message = err.message;
        //   res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.send({ statusCode: 500, err: err })
        next();
    });


}

module.exports.setup = setup;