# Secret Family Recipes

## Base URL
``` 
https://secret-family-recipes-bw-team5.herokuapp.com/api
```

## Endpoints
|         Name           |  Type  |                   Path                   |         Request           |        Result        |
|         ----           |  ----  |                   ----                   |         -------           |        ------        |
|       Register         |  POST  |                 /register                |        User Model         |     Created User     |
|        Login           |  POST  |                  /login                  |   {username, password}    |      id, token       |
|      Get Recipe        |  GET   |               /:id/recipe/               |                           |   Array of recipes   |
|  Get Recipe by title   |  GET   |     /:id/recipe/title?title={title}      |                           |   Array of recipes   |
| Get Recipe by category |  GET   | /:id/recipe/category?category={category} |                           |   Array of recipes   |
|      Add Recipes       |  POST  |               /:id/recipe/               |        Recipe Model       |     New recipe id    |
|      Edit Recipe       |  PUT   |           /:id/recipe/:recipe_id         |        Recipe Model       |     Updated count    |
|     Delete Recipe      | DELETE |           /:id/recipe/:recipe_id         |                           |     Removed count    |

*:id is the User id*

*:recipe_id is the Recipe id*

## Data Models
**User**
```
{
  email,
  username,
  password,
}
```

**Recipe**
```
{
  title,
  source,
  ingredients,
  instructions,
  category,
}
```
