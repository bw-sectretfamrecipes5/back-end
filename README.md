# Secret Family Recipes

## Base URL
``` 
{tbd}/api
```

## Endpoints
|         Name           |  Type  |                Path                 |         Request           |        Result        |
|         ----           |  ----  |                ----                 |         -------           |        ------        |
|       Register         |  POST  |              /register              |        User Model         |     Created User     |
|        Login           |  POST  |               /login                |  { username, password }   | Authentication token |
|      Get Recipe        |  GET   |            /:id/recipe/             |                           |   Array of recipes   |
|  Get Recipe by title   |  GET   |  /:id/recipe/title?search={title}   |                           |        Recipe        |
| Get Recipe by category |  GET   | /:id/recipe/category?search={title} |                           |   Array of recipes   |
|      Add Recipes       |  POST  |            /:id/recipe/             |        Recipe Model       |      New recipe      |
|      Edit Recipe       |  PUT   |           /:id/recipe/:id           |                           |    Updated recipe    |
|     Delete Recipe      | DELETE |           /:id/recipe/:id           |                           |    Deleted recipe    |

*:id before `/recipe` is the User id*

*:id after `/recipe` is the Recipe id*

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
