exports.seed = function(knex) {
  return knex('recipeDetails').del()
    .then(function () {
      return knex('recipeDetails').insert([
        {user_id: 1, recipe_id: 1},
        {user_id: 1, recipe_id: 2},
        {user_id: 2, recipe_id: 1},
      ]);
    });
};
