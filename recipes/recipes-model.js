const db = require('../data/dbConfig');

function getRecipes() {
  return db("recipes as r")
          .join("categories as c", "c.id", "r.categoryId")
          .join("users as u", "u.id", "r.userId")
          .select("r.id as recipe_id", "u.name as user_name", "c.name as category_name", "r.title", "r.source", "r.imgUrl", "r.userId as added_by")
}

function findRecipeById(id) {
  return db("recipes as r")
          .join("categories as c", "c.id", "r.categoryId")
          .join("users as u", "u.id", "r.userId")
          .where("r.id",id)
          .select("r.id as recipe_id", "u.name as user_name", "c.name as category_name", "r.title", "r.source", "r.imgUrl", "r.instructions")
          .first()
}

function findRecipeBy(filter) {
  return db("recipes as r")
          .join("categories as c", "c.id", "r.categoryId")
          .join("users as u", "u.id", "r.userId")
          .where(filter)
          .select("r.id as recipe_id", "u.name as user_name", "c.name as category_name", "r.title", "r.source", "r.imgUrl")
}

function isUserRecipe(recipe_id,user_id) {
  return db("recipes")
          .where("id",recipe_id)
          .where("userId", user_id)
          .first()
}

function addRecipe(recipe) {
  return db("recipes")
         .insert(recipe)
         .then(([id]) => findRecipeById(id))
}

function updateRecipe(recipe, id) {
  return db("recipes")
         .update(recipe)
         .where("id", id)
         .then(count => count > 0 ? findRecipeById(id) :  null)
}

function remove(id) {
  return db("recipes")
          .where("id",id)
          .del()
}

function addRecipeIngredient(ingredient) {
  return db("recipes_ingredients")
          .insert(ingredient)
}

function updateRecipeIngredient(ingredient,recipe_id,old_ingredient_id) {
  return db("recipes_ingredients")
         .update(ingredient)
         .where("recipe_id", recipe_id)
         .where("ingredient_id", old_ingredient_id)
}

function getRecipeIngredients(recipe_id, ingredient_id = 0) {
  let qry = db("recipes_ingredients as ri")
             .join("ingredients as i", "i.id", "ri.ingredient_id")
             .join("measurements as m", "m.id", "ri.measurement_id")
             .select("ri.ingredient_id", "i.name as ingredient", "ri.measurement_id", "m.name as measurements", "ri.quantity")
             .where("ri.recipe_id", recipe_id)

  if(ingredient_id !== 0)
     return qry.where("ri.ingredient_id", ingredient_id)
  else
     return qry

}

function removeRecipeIngredients(recipe_id, ingredient_id = 0) {
  let qry = db("recipes_ingredients")
             .where("recipe_id",recipe_id)
             .del()
  if(ingredient_id !== 0)
    return qry.where("ingredient_id",ingredient_id)
  else
    return qry
}

module.exports = {
  getRecipes,
  findRecipeById,
  findRecipeBy,
  isUserRecipe,
  addRecipe,
  updateRecipe,
  remove,
  getRecipeIngredients,
  addRecipeIngredient,
  removeRecipeIngredients,
  updateRecipeIngredient,
}