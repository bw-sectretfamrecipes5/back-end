exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("recipes").insert([
        {
          title: "Basic Scrambled Eggs",
          source: "The Incredible eggs",
          ingredients:
            "4. large eggs, 1/4 cup,	milk, pinch	salt, pinch	pepper, 2 tsp.	butter",
          instructions:
            "1. BEAT eggs, milk, salt and pepper in medium bowl until blended. 2. HEAT butter in large nonstick skillet over medium heat until hot. POUR in egg mixture. As eggs begin to set, gently PULL the eggs across the pan with a spatula, forming large soft curds. 3. CONTINUE cooking—pulling, lifting and folding eggs—until thickened and no visible liquid egg remains. Do not stir constantly. REMOVE from heat. SERVE immediately.",
          category: "eggs",
        },
        {
          title: "Crispy Fried Chicken",
          source: "Food Network",
          ingredients:
            "2 whole free-range,  6 cups all-purpose flour, 5 tablespoons salt,4 tablespoons ground black pepper, 2 tablespoons garlic powder, 1 tablespoon onion powder, 2 teaspoons cayenne pepper, 2 cups buttermilk",
          instructions:
            "1. Cut the whole chickens into 4, 2.Preheat your oil, in either a heavy pan, 3.In a large bowl, combine all ingredients 4.Place your chicken in a bowl 5.  Make sure that the chicken in very thoroughly coated. 6. Gently place the chicken in your hot oil.",
          category: "chicken",
        },
      ]);
    });
};
