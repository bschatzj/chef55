# Welcome to the BackEnd Repo!

## Env Vars

| ENV VAR      | Usage                                       |
| ------------ | ------------------------------------------- |
| DATABASE_URL | The URL of your production DB               |
| HASH_AMOUNT  | Amount of times the password will be hashed |
| JWT_SECRET   | salt to hash the password with              |
| PORT         | Port specified for API to listen            |

## Endpoints

| Type   | Endpoint        | Required                                             | Optional                                                                 |
| ------ | --------------- | ---------------------------------------------------- | ------------------------------------------------------------------------ |
| POST   | `/login`        | `username`, `password`                               | none                                                                     |
| POST   | `/register`     | `username`, `password`                               | `name`                                                                   |
| GET    | `/recipes`      | none                                                 | none                                                                     |
| GET    | `/recipes/:id`  | `id`                                                 | none                                                                     |
| POST   | `/recipes`      | `title`, `ingredients`, `instructions`, `categoryId` | `imgUrl`, `source`                                                       |
| PUT    | `/recipes/:id`  | `id`                                                 | `title`, `ingredients`, `instructions`, `categoryId`, `imgUrl`, `source` |
| DELETE | `recipes/:id`   | `id`                                                 | none                                                                     |
| GET    | `/measurements` | none                                                 | none                                                                     |

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
