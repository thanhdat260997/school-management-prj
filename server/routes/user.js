const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const utils = require('../utils');

router.post('/users', utils.requireRole(['admin']), function(req, res) {
  userController.create(req,res);
});

router.get('/users', utils.requireRole(['admin']), function(req, res) {
  userController.list(req,res);
});

router.get('/users/:id', utils.requireRole(['admin', 'teacher']), function(req, res) {
  userController.getUserInfo(req, res);
});

router.get('/me', utils.requireRole(['admin', 'teacher']), function(req, res) {
  userController.getLoggedInUserInfo(req, res);
});

router.put('/users/:id', utils.requireRole(['admin', 'teacher']), function(req, res) {
  userController.updateUserInfo(req, res);
});

router.delete('/users/:id', utils.requireRole(['admin']), function(req, res) {
  userController.deleteUser(req, res);
});

router.post('/users/:id/upload-profile-picture', utils.requireRole(['admin', 'teacher']), function(req, res) {
  userController.changeProfilePicture(req, res);
});

module.exports = router;