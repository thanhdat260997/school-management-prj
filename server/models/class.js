const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: { type:  Schema.Types.String, required: true, unique: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  teacher: { type: Schema.ObjectId, ref: 'User' },
  room: { type: Schema.ObjectId, ref: 'Room' }
});

ClassSchema.statics.isNameTaken = async function (name, id) {
  const foundClass = await this.findOne({ name });
  if (foundClass && foundClass._id == id)
    return false;
  return !!foundClass;
};

module.exports = mongoose.model('Class', ClassSchema);