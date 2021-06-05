const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room');
const utils = require('../utils');

router.post('/rooms', utils.requireRole(['admin']), function(req, res) {
  roomController.create(req,res);
});

router.get('/rooms', utils.requireRole(['admin']), function(req, res) {
  roomController.list(req,res);
});

router.get('/rooms/:id', utils.requireRole(['admin']), function(req, res) {
  roomController.getRoomInfo(req, res);
});

router.put('/rooms/:id', utils.requireRole(['admin']), function(req, res) {
  roomController.updateRoomInfo(req, res);
});

router.delete('/rooms/:id', utils.requireRole(['admin']), function(req, res) {
  roomController.deleteRoom(req, res);
});

module.exports = router;