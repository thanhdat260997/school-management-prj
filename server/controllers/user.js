const User = require('../models/user');
const md5 = require('md5');
const utils = require('../utils');
const multer  = require('multer');
const fs  = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const sharp = require('sharp');

exports.create = async function (req, res) {
  req.body.password = md5(req.body.password);
  let newUser = new User(req.body);
  if (!req.body.username.length) {
    res.status(400).send({ error: 'Username can not be blank' });
  } else if (!req.body.password.length) {
    res.status(400).send({ error: 'Password can not be blank' });
  } else if (await User.isUsernameTaken(req.body.username)) {
    res.status(400).send({ error: 'Username already taken' });
  } else {
    newUser.save(function (err, user) {
      if(err) {
        res.status(400).send({ error: 'Error creating user: ' + err });
      } else {
        res.status(200).send(user);
      }
    });
  }
};

exports.list = function (req, res) {
  const isAdmin = utils.getUserInfoFromToken(req);
  User.find({}).exec(function (err, users) {
    if (err) {
      res.status(500).send({ error: err });
    }
    res.status(200).send(users);
  })
};

exports.getUserInfo = function (req, res) {
  if (!checkEditAndGetUserPermission(req)) {
    res.status(403).send({ error: "Permission denied." });
  } else {
    User.findById(req.params.id).exec(function (err, user) {
      if (err) {
        res.status(500).send({ error: err });
      }
      if (!user) {
        res.status(404).send({ error: 'Not found' });
      } else {
        res.status(200).send(user);
      }
    })
  }
};

exports.getLoggedInUserInfo = function (req, res) {
  const userId = utils.getUserInfoFromToken(req)._id
  User.findById(userId).exec(function (err, user) {
    if (err) {
      res.status(500).send({ error: err });
    }
    if (!user) {
      res.status(404).send({ error: 'Not found' });
    } else {
      res.status(200).send(user);
    }
  })
};

exports.updateUserInfo = async function (req, res) {
  if (!checkEditAndGetUserPermission(req)) {
    res.status(403).send({ error: "Permission denied." });
  } else {
    let updatedInfo = {
      username: req.body.username,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      subject: req.body.subject
    }
    if (req.body.password) {
      updatedInfo.password = md5(req.body.password);
    }
    if (!req.body.username.length) {
      res.status(400).send({ error: 'Username can not be blank'});
    } else if (await User.isUsernameTaken(req.body.username, req.params.id)) {
      res.status(400).send({ error: 'Username already taken' });
    } else {
      User.updateOne({ _id: req.params.id }, updatedInfo).exec(function (err, user) {
        if (err) {
          res.status(500).send({ error: 'Username is not available' });
        }
        res.status(200).send(user);
      })
    }
  }
};

exports.deleteUser = function (req, res) {
  User.deleteOne({ _id: req.params.id }).exec(function (err) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send('success');
  })
};

exports.changeProfilePicture = function (req, res) {

  const fileNameWithDate = req.params.id + Date.now();
  let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let dir = path.join(__dirname, '..', 'avatar');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, fileNameWithDate + '.jpg');
    }
  });
  
  let upload = multer({ storage: storage}).single('avatar');
  
  upload(req, res, function (err) {
    if (err) {
      res.status(500).send({ error: "Something went wrong" });
    } else {
      const fileName = path.join(__dirname, '..', 'avatar', fileNameWithDate + '.jpg');
        const outputFileName = path.join(__dirname, '..', 'avatar', fileNameWithDate + '_resized.jpg');
        var dimensions = sizeOf(fileName);
        const square = Math.min(dimensions.width, dimensions.height);
        sharp(fileName).extract({ width: square, height: square, left: parseInt((dimensions.width - square) / 2), top: parseInt((dimensions.height - square) / 2) }).toFile(outputFileName)
          .then(function(new_file_info) {
              console.log("Image cropped and saved");
              User.updateOne({ _id: req.params.id }, { img: fileNameWithDate + '_resized.jpg' }).exec(function (err, user) {
                if (err) {
                  res.status(500).send({ error: "Something went wrong" });
                } else {
                    res.status(200).send({ error: 'Changed profile picture successfully' });
                }
              })
          })
          .catch(function(err) {
            res.status(500).send({ error: "Something went wrong" });
          });
    }
  });
}

function checkEditAndGetUserPermission (req) {
  const userInfo = utils.getUserInfoFromToken(req);
  if (userInfo.isAdmin) return true;
  else return req.params.id === userInfo._id;
}