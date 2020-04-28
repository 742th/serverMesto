const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    match: /^https?:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{2,5})?((\/[a-zA-Z0-9/]+)?)|(www\.)?\w+\.?\w*\.?\w*(\.[a-z]+|(:\d{2,5}))(\/?|\/[a-zA-Z0-9/]+))#?\/?/i,
  },
});

module.exports = mongoose.model('user', userSchema);
