var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
    emailId: {
        type: String
    }
})


User.methods = {
    saveUser: function (req, res) {
        this.save().then((entry) => {

            if (!entry) {
                res.status(500).send({
                    statusCode: 500,
                    statusMessage: 'Something went wrong! Please try again later'
                });
            } else if (entry) {
                res.status(200).send({
                    statusCode: 200,
                    statusMessage: "sucessfully saved"
                });
            }
        }).catch((err) => {

            let resBody = { statusCode: 500, statusMessage: 'Something went wrong while creating User !! Try Again Later' }
            req.log.error({ resBody: resBody }, "res body");
            res.status(500).json(resBody);

        });

    }
}

User.statics = {
    getUsers: async function (req, res) {
        try {
            let userData = await this.find({});
            res.status(200).send({ statusCode: 200, 'statusMessage': 'Success', userData: userData });
        } catch (err) {
            res.status(500).send({ statusCode: 500, 'statusMessage': 'Something went wrong! Please try again later' });
        }

    },
    removeUser: async function (req, res) {
        try {
            await this.remove({ "_id": mongoose.Types.ObjectId(req.params.userId) });
            res.status(200).send({ statusCode: 200, 'statusMessage': 'Success' });
        } catch (err) {
            res.status(500).send({ statusCode: 500, 'statusMessage': 'Something went wrong! Please try again later' });
        }
    },
    updateUser: async function (req, res) {
        try {
            let reqBody = req.body;
            await this.updateOne(
                { "_id": mongoose.Types.ObjectId(reqBody._id) },
                { "name": reqBody.name, "emailId": reqBody.emailId }
            );
            res.status(200).send({ statusCode: 200, 'statusMessage': 'Success' });
        } catch (err) {
            res.status(500).send({ statusCode: 500, 'statusMessage': 'Something went wrong! Please try again later' });
        }
    }

}



exports.User = mongoose.model("users", User);

