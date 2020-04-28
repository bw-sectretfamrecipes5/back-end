const db = require("../database/dbConfig");
module.exports = {
  findById,
  insert,
  update,
  remove,
};

function findById(id) {
  return db("recipes")
    .join('recipeDetails', 'recipeDetails.recipe_id', 'recipes.id')
    .where('recipeDetails.user_id', id);
}

function findByTitle(title) {
  return db("recipes")
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
