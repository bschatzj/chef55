
exports.seed = async function(knex) {
  await knex("recipes_ingredients").insert([
    {recipe_id: 1, ingredient_id: 1, quantity:0.5, measurement_id:5},
    {recipe_id: 1, ingredient_id: 2, quantity:2, measurement_id:1},

    {recipe_id: 2, ingredient_id: 14, quantity:1, measurement_id:4},
    {recipe_id: 2, ingredient_id: 1, quantity:1, measurement_id:9},
    {recipe_id: 2, ingredient_id: 2, quantity:1, measurement_id:9},
    {recipe_id: 2, ingredient_id: 13, quantity:2, measurement_id:1},
    {recipe_id: 2, ingredient_id: 3, quantity:1, measurement_id:1},
    {recipe_id: 2, ingredient_id: 15, quantity:1, measurement_id:13},

    {recipe_id: 3, ingredient_id: 12, quantity:1, measurement_id:4},
    {recipe_id: 3, ingredient_id: 11, quantity:0.5, measurement_id:4},
    {recipe_id: 3, ingredient_id: 8, quantity:1, measurement_id:6},
    {recipe_id: 3, ingredient_id: 16, quantity:1, measurement_id:6},
    {recipe_id: 3, ingredient_id: 9, quantity:1, measurement_id:11},
    {recipe_id: 3, ingredient_id: 3, quantity:1, measurement_id:12},

    {recipe_id: 4, ingredient_id: 2, quantity:2.5, measurement_id:4},
    {recipe_id: 4, ingredient_id: 3, quantity:1.5, measurement_id:4}
  ])
};