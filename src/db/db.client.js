const mongoose = require('mongoose');
const User = require('../resources/users/user.model');
const { MONGO_CONNECTION_STRING } = require('../common/config');
// const Column = require('../resources/boards/column.model');
// const Board = require('../resources/boards/board.model');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = [];

const password = 'admin';
bcrypt.hash(password, saltRounds, async (err, hash) => {
  if (err) return;
  await users.push(
    new User({ name: 'Volha Soika', login: 'admin', password: hash })
  );
});

// const boards = [
//   new Board({
//     title: 'boards1',
//     columns: [
//       new Column({ title: 'columns1', order: 0 }),
//       new Column({ title: 'columns2', order: 1 })
//     ]
//   }),
//   new Board({
//     title: 'boards2',
//     columns: [
//       new Column({ title: 'columns1', order: 3 }),
//       new Column({ title: 'columns2', order: 2 })
//     ]
//   })
// ];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected!');
    // db.dropDatabase();

    users.forEach(user => user.save());
    // boards.forEach(board => board.save());
    cb();
  });
};

module.exports = {
  connectToDB
};
