exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {email: 'test@email.com', username: 'test', password: hashPassword('password')},
        {email: 'user2@email.com', username: 'user2', password: hashPassword('password')},
      ]);
    });
};

const hashPassword = password => {
  const bcrypt = require('bcryptjs');
  const rounds = 12;
  const hash = bcrypt.hashSync(password, rounds);
  return hash;
};
