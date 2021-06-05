const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');
const utils = require('../utils');

router.post('/classes', utils.requireRole(['admin']), function(req, res) {
  classController.create(req,res);
});

router.get('/classes', utils.requireRole(['admin']), function(req, res) {
  classController.list(req,res);
});

router.get('/classes/:id', utils.requireRole(['admin']), function(req, res) {
  classController.getClassInfo(req, res);
});

router.put('/classes/:id', utils.requireRole(['admin']),  function(req, res) {
  classController.updateClassInfo(req, res);
});

router.delete('/classes/:id', utils.requireRole(['admin']), function(req, res) {
  classController.deleteClass(req, res);
});

router.get('/classes-by-user', utils.requireRole(['admin', 'teacher']), function(req, res) {
  classController.getAllClassByUser(req, res);
});

module.exports = router;