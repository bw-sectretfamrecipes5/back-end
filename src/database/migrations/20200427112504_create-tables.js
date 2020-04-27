exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('id');
      tbl.string('email').notNullable().unique();
      tbl.string('username').notNullable().unique().index();
      tbl.string('password').notNullable();
    })
    .createTable('recipes', tbl => {
      tbl.increments('id');
      tbl.string('title').notNullable().index();
      tbl.string('source').notNullable().index();
      tbl.text('ingredients').notNullable();
      tbl.text('instructions').notNullable();
      tbl.string('category').notNullable();
    })
    .createTable('recipeDetails', tbl => {
      tbl.increments('id');
      tbl.integer('user_id').notNullable().references('id').inTable('users');
      tbl.integer('recipe_id').notNullable().references('id').inTable('recipes');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('recipeDetails')
    .dropTableIfExists('recipes');
};
