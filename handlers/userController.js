var User = require('../models/users').User;


function saveUser(req, res) {
    let user = new User(req.body);
    user.saveUser(req, res);
}

function getUsers(req, res, next) {
    User.getUsers(req, res, next);
}


function removeUser(req, res) {
    User.removeUser(req, res);
}

function updateUser(req, res) {
    User.updateUser(req, res);
}

module.exports = {
    saveUser,
    getUsers,
    removeUser,
    updateUser
}