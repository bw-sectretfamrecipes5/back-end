const express = require("express");

const recipes = require("./recipe-model");

const router = express.Router();

//get all recipes for a user
router.get("/:id/recipe", (req, res) => {
  const { id } = req.params;

  recipes
    .findById(id)
    .then((recipes) => {
      if (recipes.length) {
        res.status(200).json(recipes)
      } else {
        res.status(404).json({ message: "No recipes found." });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "The recipes information could not be retrieved." })
    );
});

// get a recipe by id
router.get("/:id/recipe/title", (req, res) => {
  const { id } = req.params;
  const { title } = req.query;

  recipes
    .findByTitle(id, title)
    .then((recipe) => {
      if (recipe) {
        res.json(recipe);
      } else {
        res
          .status(404)
          .json({ message: "Could not find the recipe with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get recipe" });
    });
});

router.get("/:id/recipe/category", (req, res) => {
  const { id } = req.params;
  const { category } = req.query;

  recipes
    .findByCategory(id, category)
    .then((recipe) => {
      if (recipe) {
        res.json(recipe);
      } else {
        res
          .status(404)
          .json({ message: "Could not find the recipe with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get recipe" });
    });
});

// add a recipe
router.post("/:id/recipe", (req, res) => {
  const newRecipe = req.body;
  const { id } = req.params;

  recipes
    .insert(newRecipe, id)
    .then((result) => res.status(201).json(result))
    .catch((err) =>
      res.status(400).json({
        errorMessage:
          "Please provide title, source, ingredients, instructions, category for recipes .",
      })
    );
});

//update recipes
router.put("/:id/recipe/:recipe_id", (req, res) => {
  const { id, recipe_id } = req.params;
  const changes = req.body;
  recipes
    .findByRecipeId(id, recipe_id)
    .then((recipe) => {
      if (recipe.length) {
        recipes.update(changes, recipe_id).then((updatedRecipe) => {
          res.json({ updated: updatedRecipe });
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find the recipe with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update recipe" });
    });
});

router.delete("/:id/recipe/:recipe_id", (req, res) => {
  const { id, recipe_id } = req.params;

  recipes
    .remove(id, recipe_id)
    .then((deleted) => {
      console.log('deleted', deleted)
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find recipe with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete recipe" });
    });
});

module.exports = router;
