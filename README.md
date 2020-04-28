# Secret Family Recipes

## Base URL
``` 
{tbd}/api
```

## Endpoints
|         Name           |  Type  |                  Path                  |         Request           |        Result        |
|         ----           |  ----  |                  ----                  |         -------           |        ------        |
|       Register         |  POST  |                /register               |        User Model         |     Created User     |
|        Login           |  POST  |                 /login                 |   {username, password}    | Authentication token |
|      Get Recipe        |  GET   |              /:id/recipe/              |                           |   Array of recipes   |
|  Get Recipe by title   |  GET   |    /:id/recipe/title?search={title}    |                           |   Array of recipes   |
| Get Recipe by category |  GET   | /:id/recipe/category?search={category} |                           |   Array of recipes   |
|      Add Recipes       |  POST  |              /:id/recipe/              |        Recipe Model       |     New recipe id    |
|      Edit Recipe       |  PUT   |          /:id/recipe/:recipe_id        |                           |     Updated count    |
|     Delete Recipe      | DELETE |          /:id/recipe/:recipe_id        |                           |     Removed count    |

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
