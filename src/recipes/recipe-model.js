const db = require("../database/dbConfig");
module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db("recipes");
}

function findById(id) {
  return db("recipes").where({ id }).first();
}

function insert(recipe) {
  return db("recipes")
    .insert(recipe, "id")
    .then((ids) => ({ id: ids[0] }));
}

function update(recipe, id) {
  return db("recipes").where("id", Number(id)).update(recipe);
}

function remove(id) {
  return db("recipes").where("id", Number(id)).del();
}
