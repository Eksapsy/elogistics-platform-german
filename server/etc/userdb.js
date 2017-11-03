
var records = [
  {
    id: 1,
    username: 'local',
    password: 'tqnGvduWezXNS2WH',
    displayName: 'Germanos Poimenidis',
    emails: [{
      value: 'info@gpsupplies.gr'
    }]
  },
  {
    id: 2,
    username: 'thessSupplies',
    password: 'qe4zkbfU3x9w5Q6G',
    displayName: 'Thessaloniki Supplies',
    emails: [{
      value: 'info@gpsupplies.gr'
    }]
  },
  {
    id: 3,
    username: 'jack',
    password: 'secret',
    displayName: 'Jack',
    emails: [{
      value: 'info@gpsupplies.gr'
    }]
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
