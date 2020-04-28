const express = require("express");

const recipes = require("./recipe-model");

const router = express.Router();

//get all recipes
router.get("/", (req, res) => {
  recipes
    .find()
    .then((recipes) => res.status(200).json(recipes))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "The recipes information could not be retrieved." })
    );
});

// get a recipe by car id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  recipes
    .findById(id)
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
router.post("/", (req, res) => {
  const newRecipe = req.body;

  recipes
    .insert(newRecipe)
    .then((result) => res.status(201).json(result))
    .catch((err) =>
      res.status(400).json({
        errorMessage:
          "Please provide title, source, ingredients, instructions, category for recipes .",
      })
    );
});

//update recipes
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  recipes
    .findById(id)
    .then((recipe) => {
      if (recipe) {
        recipes.update(changes, id).then((updatedRecipe) => {
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  recipes
    .remove(id)
    .then((deleted) => {
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
