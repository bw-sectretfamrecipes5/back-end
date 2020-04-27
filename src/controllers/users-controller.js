const Users = require('../models/users-model');

module.exports = {
  add,
  findBy,
};

async function add(user) {
  const dbUser = await Users.add(user);
  return dbUser[0];
}

async function findBy(filter) {
  const dbUser = await Users.findBy(filter);
  return dbUser[0];
}
