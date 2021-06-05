const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: { 
    type:  Schema.Types.String,
    required: true,
    unique: true
  },
  building: { type:  Schema.Types.String }
});

RoomSchema.statics.isNameTaken = async function (name, id) {
  const room = await this.findOne({ name });
  if (room && room._id == id)
    return false;
  return !!room;
};

module.exports = mongoose.model('Room', RoomSchema);