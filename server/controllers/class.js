const Class = require('../models/class');
const utils = require('../utils');
const moment = require('moment');

exports.create = async function (req, res) {
  const canCreate = await timeAvailable(req.body.room, req.body.teacher, req.body.startTime, req.body.endTime)
  if (!moment(req.body.startTime).isBefore(req.body.endTime)){
    res.status(400).send({ error: 'Start time must before End time' });
  } else if (!canCreate) {
    res.status(400).send({ error: 'Time is not available for this room or teacher' });
  } else {
    if (!req.body.name.length) {
      res.status(400).send({ error: 'Name can not be blank' });
    } else if (await Class.isNameTaken(req.body.name)) {
      res.status(400).send({ error: 'Name already taken' });
    } else {
      let newClass = new Class(req.body);
      newClass.save(function (err, c) {
        if(err) {
          res.status(400).send({ error: err });
        } else {
          res.status(200).send(c);
        }
      });
    }
  }
};

exports.list = function (req, res) {
  Class.find({}).populate('teacher').populate('room').exec(function (err, classes) {
    if (err) {
      res.status(500).send({ error: err });
    }
    res.status(200).send(classes);
  })
};

exports.getClassInfo = function (req, res) {
  Class.findById(req.params.id).populate('teacher').populate('room').exec(function (err, foundedClass) {
    if (err) {
      res.status(500).send({ error: err });
    }
    if (!foundedClass) {
      res.status(404).send({ error: 'Not found' });
    } else {
      res.status(200).send(foundedClass);
    }
  })
};

exports.updateClassInfo = async function (req, res) {
  const canUpdate = await timeAvailable(req.body.room, req.body.teacher, req.body.startTime, req.body.endTime, req.params.id)
  if (!moment(req.body.startTime).isBefore(req.body.endTime)){
    res.status(400).send({ error: 'Start time must before End time' });
  } else if (!canUpdate) {
    res.status(400).send({ error: 'Time is not available for this room or teacher' });
  } else {
    if (!req.body.name.length) {
      res.status(400).send({ error: 'Name can not be blank' });
    } else if (await Class.isNameTaken(req.body.name, req.params.id)) {
      res.status(400).send({ error: 'Name already taken' });
    } else {
      Class.updateOne({ _id: req.params.id }, req.body).populate('teacher').populate('room').exec(function (err, updatedClass) {
        if (err) {
          res.status(500).send({ error: err });
        }
        res.status(200).send(updatedClass);
      })
    }
  }
};

exports.deleteClass = function (req, res) {
  Class.deleteOne({ _id: req.params.id }).exec(function (err) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send('success');
  })
};

exports.getAllClassByUser = function (req, res) {
  const userInfo = utils.getUserInfoFromToken(req);
  const time = req.query.time

  Class.find({ teacher: userInfo._id }).populate('teacher').populate('room').exec(function (err, classes) {
    if (err) {
      res.status({ error: 500 }).send(err);
    } else {
      const today = moment();
      let result = classes
      if (time === 'today')
        result = result.filter(c => today.isSame(c.startTime, 'd'));
      else if (time === 'past' )
        result = result.filter(c => today.isBefore(c.startTime, 'd'));
      else if (time === 'future')
        result = result.filter(c => today.isAfter(c.startTime, 'd'));
      res.status(200).send(result);
    }
  })
}

async function timeAvailable (roomId, teacherId, startTime, endTime, classId) {
  const classesWithRoom = await Class.find({ room: roomId });
  const classesWithUser = await Class.find({ teacher: teacherId });
  let roomAvailable = true;
  let userAvailable = true;

  roomAvailable = !classesWithRoom.filter(c => c._id != classId).find(c =>
    moment(startTime).isBetween(c.startTime, c.endTime) || moment(endTime).isBetween(c.startTime, c.endTime) 
    || moment(startTime).isSame(c.startTime) || moment(endTime).isSame(c.endTime)
    || moment(c.startTime).isBetween(startTime, endTime) || moment(c.endTime).isBetween(startTime, endTime)
  )
  userAvailable = !classesWithUser.filter(c => c._id != classId).find(c =>
    moment(startTime).isBetween(c.startTime, c.endTime) || moment(endTime).isBetween(c.startTime, c.endTime) 
    || moment(startTime).isSame(c.startTime) || moment(endTime).isSame(c.endTime)
    || moment(c.startTime).isBetween(startTime, endTime) || moment(c.endTime).isBetween(startTime, endTime) 
  );

  return roomAvailable && userAvailable;
}