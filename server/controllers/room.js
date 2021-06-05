const Room = require('../models/room');
const moment = require('moment');

exports.create = async function (req, res) {
  let newRoom = new Room(req.body);
  if (!req.body.name.length) {
    res.status(400).send({ error: 'Name can not be blank' });
  } else if (await Room.isNameTaken(req.body.name)) {
    res.status(400).send({ error: 'Name already taken' });
  } else {
    newRoom.save(function (err, room) {
      if(err) {
        res.status(400).send({ error: err });
      } else {
        res.status(200).send(room);
      }
    });
  }
};

exports.list = function (req, res) {
  Room.find({}).exec(function (err, rooms) {
    if (err) {
      res.status(500).send({ error: err });
    }
    res.status(200).send(rooms);
  })
};

exports.getRoomInfo = function (req, res) {
  Room.findById(req.params.id).exec(function (err, room) {
    if (err) {
      res.status(500).send({ error: err });
    }
    if (!room) {
      res.status(404).send({ error: 'Not found' });
    } else {
      res.status(200).send(room);
    }
  })
};

exports.updateRoomInfo = async function (req, res) {
  if (!req.body.name.length) {
    res.status(400).send({ error: 'Name can not be blank' });
  } else if (await Room.isNameTaken(req.body.name, req.params.id)) {
    res.status(400).send({ error: 'Name already taken' });
  } else {
    Room.updateOne({ _id: req.params.id }, req.body).exec(function (err, room) {
      if (err) {
        res.status(500).send({ error: err });
      }
      res.status(200).send(room)
    })
  }
};

exports.deleteRoom = function (req, res) {
  Room.deleteOne({ _id: req.params.id }).exec(function (err) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send('success');
  })
};