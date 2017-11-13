var keys = require('../config/keys');
var bcrypt = require('bcrypt');

var records = [
  {
    id: 1,
    username: keys.username1,
    password: keys.password1,
    displayName: keys.display1,
  },
  {
    id: 2,
    username: keys.username2,
    password: keys.password2,
    displayName: keys.display2,
  }
];

exports.findById = function(id, cb) {
  process.nextTick(() => {
    const idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + 'does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(() => {
    for (var i = 0, len = records.length; i < len; i++) {
      const record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
