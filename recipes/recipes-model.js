const db = require('../data/dbConfig');

function getRecipes() {
  return db("recipes as r")
          .join("categories as c", "c.id", "r.category_id")
          .join("users as u", "u.id", "r.user_id")
          .select("r.id as recipe_id", "u.name as user_name", "c.name as category_name", "r.title", "r.source", "r.imgUrl")
}

function findRecipeById(id) {
  return db("recipes as r")
          .join("categories as c", "c.id", "r.category_id")
          .join("users as u", "u.id", "r.user_id")
          .where("r.id",id)
          .select("r.id as recipe_id", "u.name as user_name", "c.name as category_name", "r.title", "r.source", "r.imgUrl")
          .first()
}

function findRecipeBy(filter) {
  return db("recipes as r")
          .join("categories as c", "c.id", "r.category_id")
          .join("users as u", "u.id", "r.user_id")
          .where(filter)
          .select("r.id as recipe_id", "u.name as user_name", "c.name as category_name", "r.title", "r.source", "r.imgUrl")
}

function isUserRecipe(recipe_id,user_id) {
  return db("recipes")
          .where("id",recipe_id)
          .where("user_id",user_id)
          .first()
}

function addRecipe(recipe) {
  return db("recipes")
         .insert(recipe)
         .then(([id]) => findById(id))
}

function updateRecipe(recipe, id) {
  return db("recipes")
         .update(recipe)
         .where("id", id)
         .then(count => count > 0 ? findById(id) :  null)
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
             .join("measurements as m", "m.id", "ri.measurementId")
             .select("ri.ingredient_id", "i.name as ingredient", "ri.unit_id", "m.name as measurements", "ri.quantity")
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