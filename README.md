# Secret Family Recipes

## Base URL
``` 
{tbd}/api
```

## Endpoints
|     Name      |  Type  |    Path     |           Request      |        Result        |
|     ----      |  ----  |    ----     |           -------      |        ------        |
|   Register    |  POST  |  /register  |       User Model       |     Created User     |
|    Login      |  POST  |   /login    | { username, password } | Authentication token |
|  Get Recipes  |  GET   |   /recipe   |                        |   Array of recipes   |
|  Get Recipe   |  GET   | /recipe/:id |       recipe id        |        Recipe        |
|  Add Recipes  |  POST  |   /recipe   |      Recipe Model      |      New recipe      |
|  Edit Recipe  |  PUT   | /recipe/:id |     Updated recipe     |    Updated recipe    |
| Delete Recipe | DELETE | /recipe/:id |       recipe id        |    Deleted recipe    |

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
