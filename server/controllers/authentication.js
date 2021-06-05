var md5 = require('md5');
var jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = function(req, res) {
    req.body.password = md5(req.body.password);
    User.findOne({username: req.body.username})
        .then(function(user){
            if(!user) {
                res.status(404).send({ error: 'User not existed' });
            } else {
                if(user.password !== req.body.password){
                    res.status(512).send({ error: 'Wrong password' });
                    // res.status(400).send("WRONG PASS");
                } else {
                    var responseUser = {
                        "username": req.body.username,
                        "password": req.body.password,
                        "isAdmin": user.isAdmin,
                        "_id": user._id
                    };
                    var token = jwt.sign(responseUser, 'secretKey');
                    res.status(200).send({
                        token: token,
                        username: req.body.username,
                        isAdmin: user.isAdmin
                    });
                }
            }
        })
}