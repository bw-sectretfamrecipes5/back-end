# Secret Family Recipes

## Base URL
``` 
{tbd}/api
```

## Endpoints
|         Name           |  Type  |              Path               |         Request           |        Result        |
|         ----           |  ----  |              ----               |         -------           |        ------        |
|       Register         |  POST  |            /register            |        User Model         |     Created User     |
|        Login           |  POST  |             /login              |  { username, passwo  rd } | Authentication token |
|      Get Recipe        |  GET   |           /recipe/:id           |         User id           |   Array of recipes   |
|  Get Recipe by title   |  GET   |  /recipe/title?search={title}   |       Recipe title        |        Recipe        |
| Get Recipe by category |  GET   | /recipe/category?search={title} |      Recipe category      |   Array of recipes   |
|      Add Recipes       |  POST  |             /recipe             |       Recipe Model        |      New recipe      |
|      Edit Recipe       |  PUT   |           /recipe/:id           |      Updated recipe       |    Updated recipe    |
|     Delete Recipe      | DELETE |           /recipe/:id           |        Recipe id          |    Deleted recipe    |

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
