const mongoose = require('mongoose');
const userService = require('../resources/users/user.service');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected!');
    db.dropDatabase()
      .then(() => {
        userService.addNewUser({
          name: 'Volha Soika',
          login: 'admin',
          password: 'admin'
        });
      })
      .then(() => cb());
  });
};

module.exports = {
  connectToDB
};
