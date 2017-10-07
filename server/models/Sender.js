const mongoose = require('mongoose');
const {Schema} = mongoose;

const senderSchema = new Schema({
  googleID: String,
  displayName: {
    type: String,
    required: true
  },
});

mongoose.model('senders', senderSchema);