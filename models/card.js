const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    match: /^https?:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{2,5})?((\/[a-zA-Z0-9/]+)?)|(www\.)?\w+\.?\w*\.?\w*(\.[a-z]+|(:\d{2,5}))(\/?|\/[a-zA-Z0-9/]+))#?\/?/i,
  },
  owner: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model('card', cardSchema);
