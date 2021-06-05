const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type:  Schema.Types.String, required: true },
  username: { type:  Schema.Types.String, unique: true },
  isAdmin: { type: Boolean, default: false },
  password: { type: String },
  email: { type: String },
  phone: { type: String },
  subject: { type: String },
  img: { type: Schema.Types.String, default: 'default.jpg' }
});

UserSchema.statics.isUsernameTaken = async function (username, id) {
  const user = await this.findOne({ username });
  if (user && user._id == id)
    return false;
  return !!user;
};

module.exports = mongoose.model('User', UserSchema);