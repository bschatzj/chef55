# Welcome to the BackEnd Repo!

## Env Vars

| ENV VAR      | Usage                                       |
| ------------ | ------------------------------------------- |
| DATABASE_URL | The URL of your production DB               |
| HASH_AMOUNT  | Amount of times the password will be hashed |
| JWT_SECRET   | salt to hash the password with              |
| PORT         | Port specified for API to listen            |

## Endpoints

| Type   | Endpoint             | Required                                             | Optional                                                                 | Use                                                  |
| ------ | -------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------- |
| POST   | `/login`             | `username`, `password`                               | none                                                                     | Used to login to site.                               |
| POST   | `/register`          | `username`, `password`                               | `name`                                                                   | Used to send registration information to make a user |
| GET    | `/users/:id/recipes` | `id`                                                 |                                                                          | Gets recipes for a specific user                     |
| GET    | `/recipes`           | none                                                 | none                                                                     | Gets all recipes                                     |
| GET    | `/recipes/:id`       | `id`                                                 | none                                                                     | Get a recipe by its ID                               |
| POST   | `/recipes`           | `title`, `ingredients`, `instructions`, `categoryId` | `imgUrl`, `source`                                                       | Posts a new recipe.                                  |
| PUT    | `/recipes/:id`       | `id`                                                 | `title`, `ingredients`, `instructions`, `categoryId`, `imgUrl`, `source` | Updates an existing recipe by id                     |
| DELETE | `recipes/:id`        | `id`                                                 | none                                                                     | deletes a recipe by id                               |
| GET    | `/measurements`      | none                                                 | none                                                                     | get all measurements                                 |

## Objects

| Recipe Object |
| ------------- |


```js
recipe {
 title,
 source,
 imgUrl,
 ingredients [{
  id,
  quantity,
  recipe_id,
  }],
  instructions,
  categoryId,
  userId
}
```

| User Object |
| ----------- |


```js
User {
  id,
  username,
  password,
  name
}
```

## Tables

### Users

| Row      | Type |
| -------- | ---- |
| id       | int  |
| username | str  |
| password | str  |
| name     | str  |

### Recipes

| Row    | Type |
| ------ | ---- |
| id     | int  |
| title  | str  |
| source | str  |

### Category

| Row  | Type |
| ---- | ---- |
| id   | int  |
| name | str  |

### Ingredients

| Row           | Type  |
| ------------- | ----- |
| id            | int   |
| quantity      | float |
| measurementId | int   |
| name          | str   |

### Measurements

| Row  | Type |
| ---- | ---- |
| id   | int  |
| name | str  |
