const db = require("../database/dbConfig");
module.exports = {
  findById,
  findByRecipeId,
  findByTitle,
  findByCategory,
  insert,
  update,
  remove,
};

function findById(id) {
  return db("recipes")
    .join("recipeDetails", "recipeDetails.recipe_id", "recipes.id")
    .where("recipeDetails.user_id", id);
}

function findByRecipeId(id, recipe_id) {
  return db("recipes")
    .join("recipeDetails", "recipeDetails.recipe_id", "recipes.id")
    .where("recipeDetails.user_id", id)
    .andWhere("recipes.id", recipe_id);
}

function findByTitle(id, title) {
  return db("recipes")
    .join("recipeDetails", "recipeDetails.recipe_id", "recipes.id")
    .where("recipeDetails.user_id", id)
    .andWhere("recipes.title", title);
}

function findByCategory(id, category) {
  return db("recipes")
    .join("recipeDetails", "recipeDetails.recipe_id", "recipes.id")
    .where("recipeDetails.user_id", id)
    .andWhere("recipes.category", category);
}

function insert(recipe, user_id) {
  return db("recipes")
    .insert(recipe, "id")
    .then((ids) => {
      const recipe_id = ids[0];
      return db("recipeDetails").insert({user_id, recipe_id}, "id").then(() => {
        return recipe_id;
      });
    });
}

function update(recipe, id) {
  return db("recipes").where("id", Number(id)).update(recipe);
}

function remove(id, recipe_id) {
  return findByRecipeId(id, recipe_id)
    .then(recipes => {
      if(recipes.length) {
        return db("recipes").where("id", recipe_id).del();
      }
    });
}
